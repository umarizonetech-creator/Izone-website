"""Course Applications - public POST + admin GET/update/delete."""

from fastapi import APIRouter, Depends, HTTPException

from app.auth import get_current_admin
from app.database import execute, execute_returning, fetchall, fetchone, get_db
from app.schemas import CourseApplicationCreate, CourseApplicationUpdate

router = APIRouter(prefix="/api/course-applications", tags=["Course Applications"])


@router.get("")
def list_course_applications(conn=Depends(get_db), _=Depends(get_current_admin)):
    return fetchall(conn, "SELECT * FROM course_applications ORDER BY created_at DESC")


@router.post("")
def create_course_application(body: CourseApplicationCreate, conn=Depends(get_db)):
    return execute_returning(
        conn,
        """INSERT INTO course_applications (name, email, phone, course_title, message)
           VALUES (%s,%s,%s,%s,%s) RETURNING *""",
        (body.name, body.email, body.phone, body.courseTitle, body.message),
    )


@router.patch("/{item_id}")
def update_course_application(item_id: int, body: CourseApplicationUpdate, conn=Depends(get_db), _=Depends(get_current_admin)):
    if not fetchone(conn, "SELECT id FROM course_applications WHERE id=%s", (item_id,)):
        raise HTTPException(status_code=404, detail="Course application not found")
    payload = body.model_dump(exclude_unset=True)
    return execute_returning(
        conn,
        "UPDATE course_applications SET status=COALESCE(%s,status), is_read=COALESCE(%s,is_read) WHERE id=%s RETURNING *",
        (payload.get("status"), payload.get("isRead"), item_id),
    )


@router.delete("/{item_id}")
def delete_course_application(item_id: int, conn=Depends(get_db), _=Depends(get_current_admin)):
    if not fetchone(conn, "SELECT id FROM course_applications WHERE id=%s", (item_id,)):
        raise HTTPException(status_code=404, detail="Course application not found")
    execute(conn, "DELETE FROM course_applications WHERE id=%s", (item_id,))
    return {"message": "Course application deleted"}
