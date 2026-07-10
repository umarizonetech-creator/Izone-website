"""remove social from team_members

Revision ID: c31b9e7a4d12
Revises: b291c8f10d44
Create Date: 2026-06-25 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import JSONB


revision: str = "c31b9e7a4d12"
down_revision: Union[str, Sequence[str], None] = "b291c8f10d44"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.drop_column("team_members", "social")


def downgrade() -> None:
    op.add_column("team_members", sa.Column("social", JSONB, nullable=True, server_default="{}"))
