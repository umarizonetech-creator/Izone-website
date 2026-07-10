"""Courses CRUD - public list + admin create/update/delete."""

from fastapi import APIRouter, Depends, HTTPException
from psycopg2.extras import Json

from app.auth import get_current_admin
from app.database import execute, execute_returning, fetchall, fetchone, get_db
from app.schemas import CourseCreate, CourseUpdate

router = APIRouter(prefix="/api/courses", tags=["Courses"])


@router.get("")
def list_courses(conn=Depends(get_db)):
    return fetchall(conn, "SELECT * FROM courses ORDER BY created_at DESC")


@router.get("/{item_id}")
def get_course(item_id: int, conn=Depends(get_db)):
    row = fetchone(conn, "SELECT * FROM courses WHERE id=%s", (item_id,))
    if not row:
        raise HTTPException(status_code=404, detail="Course not found")
    return row


@router.post("")
def create_course(body: CourseCreate, conn=Depends(get_db), _=Depends(get_current_admin)):
    return execute_returning(
        conn,
        """INSERT INTO courses (title, description, duration, tech_stack)
           VALUES (%s,%s,%s,%s) RETURNING *""",
        (body.title, body.description, body.duration, Json(body.techStack)),
    )


@router.put("/{item_id}")
def update_course(item_id: int, body: CourseUpdate, conn=Depends(get_db), _=Depends(get_current_admin)):
    if not fetchone(conn, "SELECT id FROM courses WHERE id=%s", (item_id,)):
        raise HTTPException(status_code=404, detail="Course not found")
    payload = body.model_dump(exclude_unset=True)
    return execute_returning(
        conn,
        """UPDATE courses
           SET title=COALESCE(%s,title),
               description=COALESCE(%s,description),
               duration=COALESCE(%s,duration),
               tech_stack=COALESCE(%s,tech_stack),
               updated_at=now()
           WHERE id=%s RETURNING *""",
        (
            payload.get("title"),
            payload.get("description"),
            payload.get("duration"),
            Json(payload["techStack"]) if "techStack" in payload else None,
            item_id,
        ),
    )


@router.delete("/{item_id}")
def delete_course(item_id: int, conn=Depends(get_db), _=Depends(get_current_admin)):
    if not fetchone(conn, "SELECT id FROM courses WHERE id=%s", (item_id,)):
        raise HTTPException(status_code=404, detail="Course not found")
    execute(conn, "DELETE FROM courses WHERE id=%s", (item_id,))
    return {"message": "Course deleted"}
