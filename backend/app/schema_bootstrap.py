"""Runtime-safe schema alignment for existing databases."""

from sqlalchemy import create_engine
from app.database import get_raw_conn, release_conn, Base
from app.config import DATABASE_URL
import app.models  # noqa: F401


SCHEMA_UPDATES = [
    """
    CREATE TABLE IF NOT EXISTS admin_credentials (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        updated_at TIMESTAMPTZ DEFAULT NOW()
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS admin_password_resets (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        code_hash VARCHAR(64) NOT NULL,
        expires_at TIMESTAMPTZ NOT NULL,
        used_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ DEFAULT NOW()
    )
    """,
    "CREATE INDEX IF NOT EXISTS idx_admin_password_resets_username_created_at ON admin_password_resets (username, created_at DESC)",
    "ALTER TABLE popups ADD COLUMN IF NOT EXISTS image TEXT DEFAULT ''",
    "ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS image TEXT DEFAULT ''",
    "ALTER TABLE job_applications ADD COLUMN IF NOT EXISTS address TEXT DEFAULT ''",
    "ALTER TABLE job_applications ADD COLUMN IF NOT EXISTS message TEXT DEFAULT ''",
    "ALTER TABLE job_applications ADD COLUMN IF NOT EXISTS resume_type VARCHAR(255) DEFAULT ''",
    "ALTER TABLE intern_applications ADD COLUMN IF NOT EXISTS message TEXT DEFAULT ''",
    "ALTER TABLE intern_applications ADD COLUMN IF NOT EXISTS resume TEXT DEFAULT ''",
    "ALTER TABLE intern_applications ADD COLUMN IF NOT EXISTS resume_name VARCHAR(255) DEFAULT ''",
    "ALTER TABLE intern_applications ADD COLUMN IF NOT EXISTS resume_type VARCHAR(255) DEFAULT ''",
    "ALTER TABLE intern_roles ADD COLUMN IF NOT EXISTS description TEXT DEFAULT ''",
    "ALTER TABLE intern_roles ADD COLUMN IF NOT EXISTS duration VARCHAR(100) DEFAULT '3 Months'",
    "ALTER TABLE site_photos ADD COLUMN IF NOT EXISTS name VARCHAR(255) DEFAULT ''",
    "ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS tags JSON DEFAULT '[]'::json",
    "ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS client_name VARCHAR(255) DEFAULT ''",
    "ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS link TEXT DEFAULT ''",
    """
    CREATE TABLE IF NOT EXISTS courses (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT DEFAULT '',
        duration VARCHAR(100) DEFAULT '',
        tech_stack JSON DEFAULT '[]'::json,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS course_applications (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) DEFAULT '',
        course_title VARCHAR(255) NOT NULL,
        message TEXT DEFAULT '',
        status VARCHAR(50) DEFAULT 'Pending',
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMPTZ DEFAULT NOW()
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS departments (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT DEFAULT '',
        members JSON DEFAULT '[]'::json,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
    )
    """,
]


def ensure_database_schema():
    """Create tables if they don't exist, then apply additive schema updates."""
    _engine = create_engine(DATABASE_URL)
    Base.metadata.create_all(bind=_engine)
    _engine.dispose()
    conn = get_raw_conn()
    conn.autocommit = True
    try:
        with conn.cursor() as cur:
            for statement in SCHEMA_UPDATES:
                cur.execute(statement)
    finally:
        release_conn(conn)
