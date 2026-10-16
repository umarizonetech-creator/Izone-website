"""Courses CRUD - public list + admin create/update/delete."""

import re
from fastapi import APIRouter, Depends, HTTPException
from psycopg2.extras import Json

from app.auth import get_current_admin
from app.database import execute, execute_returning, fetchall, fetchone, get_db
from app.schemas import CourseCreate, CourseUpdate, CourseReorderRequest

router = APIRouter(prefix="/api/courses", tags=["Courses"])


def slugify(text: str) -> str:
    cleaned = re.sub(r'[^a-zA-Z0-9]+', '-', text.strip().lower())
    return cleaned.strip('-')


@router.get("")
def list_courses(conn=Depends(get_db)):
    return fetchall(conn, "SELECT * FROM courses ORDER BY COALESCE(order_index, 0) ASC, id ASC")


@router.put("/reorder")
def reorder_courses(body: CourseReorderRequest, conn=Depends(get_db), _=Depends(get_current_admin)):
    for item in body.orders:
        execute(conn, "UPDATE courses SET order_index=%s, updated_at=now() WHERE id=%s", (item.orderIndex, item.id))
    return fetchall(conn, "SELECT * FROM courses ORDER BY COALESCE(order_index, 0) ASC, id ASC")


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
    return row


@router.post("")
def create_course(body: CourseCreate, conn=Depends(get_db), _=Depends(get_current_admin)):
    clean_slug = slugify(body.slug) if body.slug else slugify(body.title)
    return execute_returning(
        conn,
        """INSERT INTO courses (title, slug, description, duration, tech_stack, headline, badge, mode, certificate, highlights, basic_plan, advanced_plan, image_url, order_index)
           VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s) RETURNING *""",
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
        ),
    )


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
            item_id,
        ),
    )


@router.delete("/{item_id}")
def delete_course(item_id: int, conn=Depends(get_db), _=Depends(get_current_admin)):
    if not fetchone(conn, "SELECT id FROM courses WHERE id=%s", (item_id,)):
        raise HTTPException(status_code=404, detail="Course not found")
    execute(conn, "DELETE FROM courses WHERE id=%s", (item_id,))
    return {"message": "Course deleted"}
