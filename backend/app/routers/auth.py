"""Auth router - admin login and password recovery endpoints."""

import hashlib
import hmac
import logging
import secrets
import smtplib
from datetime import datetime, timedelta, timezone
from email.message import EmailMessage

import psycopg2.extras
from fastapi import APIRouter, HTTPException, Request, status
from passlib.context import CryptContext

from app.auth import create_access_token
from app.config import (
    ADMIN_PASSWORD,
    ADMIN_RECOVERY_EMAIL,
    ADMIN_USERNAME,
    PASSWORD_RESET_CODE_EXPIRE_MINUTES,
    SECRET_KEY,
    SMTP_FROM_EMAIL,
    SMTP_FROM_NAME,
    SMTP_HOST,
    SMTP_PASSWORD,
    SMTP_PORT,
    SMTP_USERNAME,
    SMTP_USE_TLS,
)
from app.database import get_raw_conn, release_conn
from app.schemas import (
    ForgotPasswordRequest,
    PasswordResetResponse,
    ResetPasswordRequest,
    TokenResponse,
    VerifyCodeRequest,
)

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/auth", tags=["Auth"])
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def _hash_code(code: str) -> str:
    return hmac.new(SECRET_KEY.encode("utf-8"), code.encode("utf-8"), hashlib.sha256).hexdigest()


def _mask_email(email: str) -> str:
    if "@" not in email:
        return ""
    local, domain = email.split("@", 1)
    prefix = local[:2] if len(local) > 2 else local[:1]
    return f"{prefix}***@{domain}"


def _recovery_email() -> str:
    return ADMIN_RECOVERY_EMAIL or SMTP_FROM_EMAIL or SMTP_USERNAME


def _fetch_admin_credential(conn):
    with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
        cur.execute("SELECT username, password_hash FROM admin_credentials WHERE username = %s", (ADMIN_USERNAME,))
        return cur.fetchone()


def _verify_admin_password(conn, username: str, password: str) -> bool:
    if username != ADMIN_USERNAME:
        return False

    credential = _fetch_admin_credential(conn)
    if credential and credential.get("password_hash"):
        return pwd_context.verify(password, credential["password_hash"])

    return hmac.compare_digest(password, ADMIN_PASSWORD)


def _set_admin_password(conn, new_password: str) -> None:
    password_hash = pwd_context.hash(new_password)
    with conn.cursor() as cur:
        cur.execute(
            """
            INSERT INTO admin_credentials (username, password_hash, updated_at)
            VALUES (%s, %s, NOW())
            ON CONFLICT (username)
            DO UPDATE SET password_hash = EXCLUDED.password_hash, updated_at = NOW()
            """,
            (ADMIN_USERNAME, password_hash),
        )


def _send_reset_email(recipient: str, code: str) -> None:
    if not SMTP_HOST or not SMTP_FROM_EMAIL:
        raise RuntimeError("SMTP is not configured")

    message = EmailMessage()
    message["Subject"] = "Your iZone admin password reset code"
    message["From"] = f"{SMTP_FROM_NAME} <{SMTP_FROM_EMAIL}>"
    message["To"] = recipient
    message.set_content(
        "\n".join(
            [
                "Your iZone admin password reset code is:",
                "",
                code,
                "",
                f"This code expires in {PASSWORD_RESET_CODE_EXPIRE_MINUTES} minutes.",
                "If you did not request this, you can ignore this email.",
            ]
        )
    )

    with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=20) as server:
        if SMTP_USE_TLS:
            server.starttls()
        if SMTP_USERNAME and SMTP_PASSWORD:
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
        server.send_message(message)


def _validate_reset_code(conn, username: str, code: str):
    if username != ADMIN_USERNAME:
        return None

    with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
        cur.execute(
            """
            SELECT id, code_hash, expires_at, used_at
            FROM admin_password_resets
            WHERE username = %s
            ORDER BY created_at DESC
            LIMIT 1
            """,
            (username,),
        )
        reset = cur.fetchone()

    if not reset or reset.get("used_at"):
        return None
    expires_at = reset["expires_at"]
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    if expires_at <= datetime.now(timezone.utc):
        return None
    if not hmac.compare_digest(reset["code_hash"], _hash_code(code)):
        return None
    return reset


@router.post("/login", response_model=TokenResponse)
async def admin_login(request: Request):
    conn = None
    try:
        content_type = request.headers.get("content-type", "").lower()

        if "application/json" in content_type:
            payload = await request.json()
            username = payload.get("username", "")
            password = payload.get("password", "")
        else:
            form = await request.form()
            username = str(form.get("username", ""))
            password = str(form.get("password", ""))

        logger.info(f"Login attempt - Username: {username}, Password length: {len(password)}")
        
        conn = get_raw_conn()
        credential = _fetch_admin_credential(conn)
        logger.info(f"Fetched credential from DB: {credential}")
        
        if not _verify_admin_password(conn, username, password):
            logger.warning(f"Failed login attempt for username: {username}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid username or password",
            )

        token = create_access_token(data={"sub": username})
        logger.info(f"Successful login for username: {username}")
        return TokenResponse(access_token=token)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error during login: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred during login"
        )
    finally:
        if conn:
            release_conn(conn)


@router.post("/forgot-password", response_model=PasswordResetResponse)
def forgot_password(payload: ForgotPasswordRequest):
    recipient = _recovery_email()
    if payload.username != ADMIN_USERNAME:
        logger.warning(f"Password reset requested for invalid username: {payload.username}")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Admin username not found")
    if not recipient:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Admin recovery email is not configured",
        )

    code = f"{secrets.randbelow(1_000_000):06d}"
    expires_at = datetime.now(timezone.utc) + timedelta(minutes=PASSWORD_RESET_CODE_EXPIRE_MINUTES)
    conn = get_raw_conn()
    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO admin_password_resets (username, code_hash, expires_at)
                VALUES (%s, %s, %s)
                """,
                (payload.username, _hash_code(code), expires_at),
            )
        _send_reset_email(recipient, code)
        conn.commit()
        logger.info("Password reset OTP sent")
        return PasswordResetResponse(message="OTP sent", masked_email=_mask_email(recipient))
    except RuntimeError as exc:
        conn.rollback()
        logger.error(f"Password reset email configuration error: {str(exc)}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(exc))
    except Exception as exc:
        conn.rollback()
        logger.error(f"Failed to send password reset OTP: {str(exc)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to send OTP email",
        )
    finally:
        release_conn(conn)


@router.post("/verify-code", response_model=PasswordResetResponse)
def verify_code(payload: VerifyCodeRequest):
    conn = get_raw_conn()
    try:
        reset = _validate_reset_code(conn, payload.username, payload.code)
        if not reset:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid or expired OTP",
            )
        return PasswordResetResponse(message="OTP verified")
    finally:
        release_conn(conn)


@router.post("/reset-password", response_model=PasswordResetResponse)
def reset_password(payload: ResetPasswordRequest):
    conn = get_raw_conn()
    try:
        reset = _validate_reset_code(conn, payload.username, payload.code)
        if not reset:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid or expired OTP",
            )

        _set_admin_password(conn, payload.new_password)
        with conn.cursor() as cur:
            cur.execute(
                "UPDATE admin_password_resets SET used_at = NOW() WHERE id = %s",
                (reset["id"],),
            )
        conn.commit()
        logger.info("Admin password reset successfully")
        return PasswordResetResponse(message="Password reset successfully")
    except HTTPException:
        conn.rollback()
        raise
    except Exception as exc:
        conn.rollback()
        logger.error(f"Failed to reset admin password: {str(exc)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to reset password",
        )
    finally:
        release_conn(conn)
