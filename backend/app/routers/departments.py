"""Departments CRUD – raw psycopg2."""

from fastapi import APIRouter, Depends, HTTPException
from app.database import get_db, fetchall, fetchone, execute_returning, execute
from app.auth import get_current_admin

router = APIRouter(prefix="/api/departments", tags=["Departments"])


@router.get("")
def list_departments(conn=Depends(get_db)):
    return fetchall(conn, "SELECT * FROM departments ORDER BY created_at ASC")


@router.post("")
def create_department(body: dict, conn=Depends(get_db), _=Depends(get_current_admin)):
    name = body.get("name", "")
    description = body.get("description", "")
    members = body.get("members", [])
    if not name:
        raise HTTPException(status_code=422, detail="name is required")
    import json
    return execute_returning(
        conn,
        "INSERT INTO departments (name, description, members) VALUES (%s,%s,%s) RETURNING *",
        (name, description, json.dumps(members)),
    )


@router.put("/{item_id}")
def update_department(item_id: int, body: dict, conn=Depends(get_db), _=Depends(get_current_admin)):
    if not fetchone(conn, "SELECT id FROM departments WHERE id=%s", (item_id,)):
        raise HTTPException(status_code=404, detail="Department not found")
    import json
    members = body.get("members", [])
    return execute_returning(
        conn,
        "UPDATE departments SET name=COALESCE(%s,name), description=COALESCE(%s,description), members=%s, updated_at=now() WHERE id=%s RETURNING *",
        (body.get("name"), body.get("description"), json.dumps(members), item_id),
    )


@router.delete("/{item_id}")
def delete_department(item_id: int, conn=Depends(get_db), _=Depends(get_current_admin)):
    if not fetchone(conn, "SELECT id FROM departments WHERE id=%s", (item_id,)):
        raise HTTPException(status_code=404, detail="Department not found")
    execute(conn, "DELETE FROM departments WHERE id=%s", (item_id,))
    return {"message": "Department deleted"}
