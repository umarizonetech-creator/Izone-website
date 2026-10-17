"""Courses CRUD - public list + admin create/update/delete."""

import re
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException
from psycopg2.extras import Json

from app.auth import get_current_admin
from app.database import execute, execute_returning, fetchall, fetchone, get_db
from app.schemas import CourseCreate, CourseUpdate, CourseReorderRequest, UniversalCourseOffer

router = APIRouter(prefix="/api/courses", tags=["Courses"])


def slugify(text: str) -> str:
    cleaned = re.sub(r'[^a-zA-Z0-9]+', '-', text.strip().lower())
    return cleaned.strip('-')


def _is_deadline_passed(deadline_str: str) -> bool:
    if not deadline_str or not str(deadline_str).strip():
        return False
    clean = str(deadline_str).strip()
    try:
        # Handle YYYY-MM-DD (treat as end of that day in local time)
        if len(clean) == 10 and clean.count('-') == 2:
            dt = datetime.strptime(clean, "%Y-%m-%d").replace(hour=23, minute=59, second=59)
            return datetime.now() > dt
        # Handle ISO / datetime-local format (e.g. 2026-10-25T18:00 or 2026-10-25T18:00:00)
        clean_iso = clean.replace('Z', '+00:00')
        dt = datetime.fromisoformat(clean_iso)
        if dt.tzinfo is not None:
            now = datetime.now(timezone.utc)
        else:
            now = datetime.now()
        return now > dt
    except Exception:
        return False


def _get_universal_offer_dict(conn) -> dict:
    row = fetchone(conn, "SELECT value FROM site_settings WHERE key='universal_course_offer'")
    if row and row.get("value") and isinstance(row["value"], dict):
        offer = dict(row["value"])
    else:
        offer = {
            "active": False,
            "message": "Vijayadasami offer",
            "discountPercent": 30,
            "badge": "Top Discount of the Sale",
            "deadline": "",
        }

    # Automatically disable the offer if the time set by admin has arrived
    if offer.get("active") and offer.get("deadline"):
        if _is_deadline_passed(offer["deadline"]):
            offer["active"] = False
            try:
                execute(
                    conn,
                    "UPDATE site_settings SET value = %s, updated_at = now() WHERE key = 'universal_course_offer'",
                    (Json(offer),),
                )
                execute(conn, "UPDATE courses SET offer_active = false, updated_at = now()")
            except Exception:
                pass
    return offer


def _apply_universal_offer(item: dict, offer: dict) -> dict:
    if not item:
        return item
    is_active = bool(offer.get("active", False)) and not _is_deadline_passed(offer.get("deadline", ""))
    item["offer_active"] = is_active
    item["discount_percent"] = int(offer.get("discountPercent", 0)) if is_active else 0
    item["offer_message"] = offer.get("message", "") if is_active else ""
    item["offer_badge"] = offer.get("badge", "") if is_active else ""
    item["offer_deadline"] = offer.get("deadline", "")
    return item


@router.get("")
def list_courses(conn=Depends(get_db)):
    rows = fetchall(conn, "SELECT * FROM courses ORDER BY COALESCE(order_index, 0) ASC, id ASC")
    offer = _get_universal_offer_dict(conn)
    for r in rows:
        _apply_universal_offer(r, offer)
    return rows


@router.get("/universal-offer")
def get_universal_offer(conn=Depends(get_db)):
    return _get_universal_offer_dict(conn)


@router.put("/universal-offer")
def update_universal_offer(body: UniversalCourseOffer, conn=Depends(get_db), _=Depends(get_current_admin)):
    data = body.model_dump()
    # If the admin set a deadline that has already passed, automatically mark active as False
    if data.get("active") and data.get("deadline") and _is_deadline_passed(data["deadline"]):
        data["active"] = False

    execute(
        conn,
        """INSERT INTO site_settings (key, value, updated_at)
           VALUES ('universal_course_offer', %s, now())
           ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()""",
        (Json(data),),
    )
    # Apply to all courses in the database
    execute(
        conn,
        """UPDATE courses
           SET offer_active=%s,
               discount_percent=%s,
               offer_message=%s,
               offer_badge=%s,
               offer_deadline=%s,
               updated_at=now()""",
        (
            data["active"],
            data["discountPercent"] if data["active"] else 0,
            data["message"] if data["active"] else "",
            data["badge"] if data["active"] else "",
            data["deadline"],
        ),
    )
    return data


@router.put("/reorder")
def reorder_courses(body: CourseReorderRequest, conn=Depends(get_db), _=Depends(get_current_admin)):
    for item in body.orders:
        execute(conn, "UPDATE courses SET order_index=%s, updated_at=now() WHERE id=%s", (item.orderIndex, item.id))
    return list_courses(conn=conn)


@router.get("/{identifier}")
def get_course(identifier: str, conn=Depends(get_db)):
    if identifier.isdigit():
        row = fetchone(conn, "SELECT * FROM courses WHERE id=%s", (int(identifier),))
    else:
        row = fetchone(conn, "SELECT * FROM courses WHERE slug=%s", (identifier,))
        if not row:
            row = fetchone(conn, "SELECT * FROM courses WHERE LOWER(slug)=LOWER(%s)", (identifier,))
    if not row:
        raise HTTPException(status_code=404, detail="Course not found")
    offer = _get_universal_offer_dict(conn)
    _apply_universal_offer(row, offer)
    return row


@router.post("")
def create_course(body: CourseCreate, conn=Depends(get_db), _=Depends(get_current_admin)):
    clean_slug = slugify(body.slug) if body.slug else slugify(body.title)
    offer = _get_universal_offer_dict(conn)
    created = execute_returning(
        conn,
        """INSERT INTO courses (title, slug, description, duration, tech_stack, headline, badge, mode, certificate, highlights, basic_plan, advanced_plan, image_url, order_index, offer_price, original_price, offer_deadline, offer_badge, offer_active, discount_percent, offer_message)
           VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s) RETURNING *""",
        (
            body.title,
            clean_slug,
            body.description,
            body.duration,
            Json(body.techStack),
            body.headline or "",
            body.badge or "",
            body.mode or "Offline Classroom Training",
            body.certificate or "Certificate Included",
            Json(body.highlights) if body.highlights is not None else Json([]),
            Json(body.basicPlan) if body.basicPlan is not None else Json({}),
            Json(body.advancedPlan) if body.advancedPlan is not None else Json({}),
            body.imageUrl or "",
            body.orderIndex or 0,
            body.offerPrice or "",
            body.originalPrice or "",
            offer.get("deadline", ""),
            offer.get("badge", ""),
            bool(offer.get("active", False)),
            int(offer.get("discountPercent", 0)),
            offer.get("message", ""),
        ),
    )
    return _apply_universal_offer(created, offer)


@router.put("/{item_id}")
def update_course(item_id: int, body: CourseUpdate, conn=Depends(get_db), _=Depends(get_current_admin)):
    if not fetchone(conn, "SELECT id FROM courses WHERE id=%s", (item_id,)):
        raise HTTPException(status_code=404, detail="Course not found")
    payload = body.model_dump(exclude_unset=True)
    slug_val = None
    if "slug" in payload:
        slug_val = slugify(payload["slug"]) if payload["slug"] else None

    return execute_returning(
        conn,
        """UPDATE courses
           SET title=COALESCE(%s,title),
               slug=COALESCE(%s,slug),
               description=COALESCE(%s,description),
               duration=COALESCE(%s,duration),
               tech_stack=COALESCE(%s,tech_stack),
               headline=COALESCE(%s,headline),
               badge=COALESCE(%s,badge),
               mode=COALESCE(%s,mode),
               certificate=COALESCE(%s,certificate),
               highlights=COALESCE(%s,highlights),
               basic_plan=COALESCE(%s,basic_plan),
               advanced_plan=COALESCE(%s,advanced_plan),
               image_url=COALESCE(%s,image_url),
               order_index=COALESCE(%s,order_index),
               offer_price=COALESCE(%s,offer_price),
               original_price=COALESCE(%s,original_price),
               offer_deadline=COALESCE(%s,offer_deadline),
               offer_badge=COALESCE(%s,offer_badge),
               offer_active=COALESCE(%s,offer_active),
               discount_percent=COALESCE(%s,discount_percent),
               offer_message=COALESCE(%s,offer_message),
               updated_at=now()
           WHERE id=%s RETURNING *""",
        (
            payload.get("title"),
            slug_val,
            payload.get("description"),
            payload.get("duration"),
            Json(payload["techStack"]) if "techStack" in payload else None,
            payload.get("headline"),
            payload.get("badge"),
            payload.get("mode"),
            payload.get("certificate"),
            Json(payload["highlights"]) if "highlights" in payload else None,
            Json(payload["basicPlan"]) if "basicPlan" in payload else None,
            Json(payload["advancedPlan"]) if "advancedPlan" in payload else None,
            payload.get("imageUrl"),
            payload.get("orderIndex"),
            payload.get("offerPrice"),
            payload.get("originalPrice"),
            payload.get("offerDeadline"),
            payload.get("offerBadge"),
            payload.get("offerActive"),
            payload.get("discountPercent"),
            payload.get("offerMessage"),
            item_id,
        ),
    )


@router.delete("/{item_id}")
def delete_course(item_id: int, conn=Depends(get_db), _=Depends(get_current_admin)):
    if not fetchone(conn, "SELECT id FROM courses WHERE id=%s", (item_id,)):
        raise HTTPException(status_code=404, detail="Course not found")
    execute(conn, "DELETE FROM courses WHERE id=%s", (item_id,))
    return {"message": "Course deleted"}
