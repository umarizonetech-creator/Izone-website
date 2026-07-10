"""Portfolio Projects CRUD - raw psycopg2."""

import json
from typing import List

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import RedirectResponse

from app.auth import get_current_admin
from app.database import execute, execute_returning, fetchall, fetchone, get_db
from app.schemas import PortfolioCreate, PortfolioOut, PortfolioUpdate

router = APIRouter(prefix="/api/portfolios", tags=["Portfolios"])


def _normalize_tags(row: dict | None) -> dict | None:
    """Ensure tags come back as a clean list of strings."""
    if not row:
        return row

    tags = row.get("tags")
    if isinstance(tags, str):
        try:
            tags = json.loads(tags)
        except json.JSONDecodeError:
            tags = [part.strip() for part in tags.split(",")]

    if not isinstance(tags, list):
        tags = []

    row["tags"] = [str(tag).strip() for tag in tags if str(tag).strip()][:4]
    return row


def _tags_json(tags: List[str]) -> str:
    return json.dumps([tag.strip() for tag in tags if tag.strip()][:4])


@router.get("", response_model=List[PortfolioOut])
def list_portfolios(conn=Depends(get_db)):
    rows = fetchall(conn, "SELECT * FROM portfolios ORDER BY created_at DESC")
    return [_normalize_tags(row) for row in rows]


@router.get("/{item_id}/visit")
def visit_portfolio(item_id: int, conn=Depends(get_db)):
    """Server-side redirect to the portfolio link — avoids any client CORS issues."""
    row = fetchone(conn, "SELECT link FROM portfolios WHERE id=%s", (item_id,))
    if not row or not row.get("link"):
        raise HTTPException(status_code=404, detail="No link found")
    return RedirectResponse(url=row["link"], status_code=302)


@router.get("/{item_id}", response_model=PortfolioOut)
def get_portfolio(item_id: int, conn=Depends(get_db)):
    row = fetchone(conn, "SELECT * FROM portfolios WHERE id=%s", (item_id,))
    if not row:
        raise HTTPException(status_code=404, detail="Portfolio not found")
    return _normalize_tags(row)


@router.post("", response_model=PortfolioOut)
def create_portfolio(body: PortfolioCreate, conn=Depends(get_db), _=Depends(get_current_admin)):
    row = execute_returning(
        conn,
        "INSERT INTO portfolios (title, category, description, image, tags, client_name, link) VALUES (%s,%s,%s,%s,%s::json,%s,%s) RETURNING *",
        (body.title, body.category, body.description, body.image, _tags_json(body.tags), body.clientName, body.link),
    )
    return _normalize_tags(row)


@router.put("/{item_id}", response_model=PortfolioOut)
def update_portfolio(item_id: int, body: PortfolioUpdate, conn=Depends(get_db), _=Depends(get_current_admin)):
    if not fetchone(conn, "SELECT id FROM portfolios WHERE id=%s", (item_id,)):
        raise HTTPException(status_code=404, detail="Portfolio not found")

    payload = body.model_dump(exclude_unset=True)
    tags = payload.get("tags")
    tags_json = _tags_json(tags) if tags is not None else None

    row = execute_returning(
        conn,
        "UPDATE portfolios SET title=COALESCE(%s,title), category=COALESCE(%s,category), description=COALESCE(%s,description), image=COALESCE(%s,image), tags=COALESCE(%s::json,tags), client_name=COALESCE(%s,client_name), link=COALESCE(%s,link), updated_at=now() WHERE id=%s RETURNING *",
        (payload.get("title"), payload.get("category"), payload.get("description"), payload.get("image"), tags_json, payload.get("clientName"), payload.get("link"), item_id),
    )
    return _normalize_tags(row)


@router.delete("/{item_id}")
def delete_portfolio(item_id: int, conn=Depends(get_db), _=Depends(get_current_admin)):
    if not fetchone(conn, "SELECT id FROM portfolios WHERE id=%s", (item_id,)):
        raise HTTPException(status_code=404, detail="Portfolio not found")
    execute(conn, "DELETE FROM portfolios WHERE id=%s", (item_id,))
    return {"message": "Portfolio deleted"}
