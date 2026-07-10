"""Team Members CRUD - raw psycopg2."""

from fastapi import APIRouter, Depends, HTTPException

from app.auth import get_current_admin
from app.database import execute, execute_returning, fetchall, fetchone, get_db
from app.schemas import TeamMemberCreate, TeamMemberUpdate

router = APIRouter(prefix="/api/team", tags=["Team Members"])

TEAM_COLUMNS = "id, name, role, avatar, bio, category, created_at, updated_at"


@router.get("")
def list_team_members(conn=Depends(get_db)):
    return fetchall(conn, f"SELECT {TEAM_COLUMNS} FROM team_members ORDER BY created_at ASC")


@router.post("")
def create_team_member(body: TeamMemberCreate, conn=Depends(get_db), _=Depends(get_current_admin)):
    return execute_returning(
        conn,
        f"INSERT INTO team_members (name, role, avatar, bio, category) VALUES (%s,%s,%s,%s,%s) RETURNING {TEAM_COLUMNS}",
        (body.name, body.role, body.avatar, body.bio, body.category),
    )


@router.put("/{item_id}")
def update_team_member(item_id: int, body: TeamMemberUpdate, conn=Depends(get_db), _=Depends(get_current_admin)):
    if not fetchone(conn, "SELECT id FROM team_members WHERE id=%s", (item_id,)):
        raise HTTPException(status_code=404, detail="Team member not found")

    payload = body.model_dump(exclude_unset=True)
    return execute_returning(
        conn,
        f"UPDATE team_members SET name=COALESCE(%s,name), role=COALESCE(%s,role), avatar=COALESCE(%s,avatar), bio=COALESCE(%s,bio), category=COALESCE(%s,category), updated_at=now() WHERE id=%s RETURNING {TEAM_COLUMNS}",
        (payload.get("name"), payload.get("role"), payload.get("avatar"), payload.get("bio"), payload.get("category"), item_id),
    )


@router.delete("/{item_id}")
def delete_team_member(item_id: int, conn=Depends(get_db), _=Depends(get_current_admin)):
    if not fetchone(conn, "SELECT id FROM team_members WHERE id=%s", (item_id,)):
        raise HTTPException(status_code=404, detail="Team member not found")
    execute(conn, "DELETE FROM team_members WHERE id=%s", (item_id,))
    return {"message": "Team member deleted"}
