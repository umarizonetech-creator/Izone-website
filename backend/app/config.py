import os
import re
from pathlib import Path
from urllib.parse import urlparse

from dotenv import load_dotenv

# Load the backend-local .env even when the process starts from another directory.
BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env", override=True)

DATABASE_URL: str = os.environ["DATABASE_URL"]
SECRET_KEY: str = os.environ["SECRET_KEY"]  # MUST be set in production (32+ chars)
ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "1440"))
ADMIN_USERNAME: str = os.environ["ADMIN_USERNAME"]  # MUST be set in production
ADMIN_PASSWORD: str = os.environ["ADMIN_PASSWORD"]  # MUST be set in production
ADMIN_RECOVERY_EMAIL: str = os.getenv("ADMIN_RECOVERY_EMAIL", os.getenv("ADMIN_EMAIL", ""))
DEBUG: bool = os.getenv("DEBUG", "false").lower() == "true"


def _split_env_values(raw: str) -> list[str]:
    return [part.strip() for part in re.split(r"[,\n;]+", raw) if part.strip()]


def _normalize_origin(origin: str) -> str | None:
    value = origin.strip().rstrip("/")
    if not value:
        return None

    if "://" not in value:
        host = value
        scheme = "http" if host.startswith(("localhost", "127.", "0.0.0.0", "[::1]", "::1")) else "https"
        value = f"{scheme}://{host}"

    parsed = urlparse(value)
    if not parsed.scheme or not parsed.netloc:
        return None

    return f"{parsed.scheme}://{parsed.netloc}"


def _load_allowed_origins() -> list[str]:
    raw = os.getenv(
        "ALLOWED_ORIGINS",
        "http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000,http://127.0.0.1:3000",
    )
    values = []
    for entry in _split_env_values(raw):
        normalized = _normalize_origin(entry)
        if normalized and normalized not in values:
            values.append(normalized)
    return values


def _load_allowed_origin_regexes() -> list[str]:
    raw = os.getenv("ALLOWED_ORIGIN_REGEXES", "")
    return _split_env_values(raw)


ALLOWED_ORIGINS: list[str] = _load_allowed_origins()
ALLOWED_ORIGIN_REGEXES: list[str] = _load_allowed_origin_regexes()

SMTP_HOST: str = os.getenv("SMTP_HOST", "")
SMTP_PORT: int = int(os.getenv("SMTP_PORT", "587"))
SMTP_USERNAME: str = os.getenv("SMTP_USERNAME", "")
SMTP_PASSWORD: str = os.getenv("SMTP_PASSWORD", "")
SMTP_FROM_EMAIL: str = os.getenv("SMTP_FROM_EMAIL", SMTP_USERNAME)
SMTP_FROM_NAME: str = os.getenv("SMTP_FROM_NAME", "iZone Technologies")
SMTP_USE_TLS: bool = os.getenv("SMTP_USE_TLS", "true").lower() == "true"
PASSWORD_RESET_CODE_EXPIRE_MINUTES: int = int(os.getenv("PASSWORD_RESET_CODE_EXPIRE_MINUTES", "10"))
