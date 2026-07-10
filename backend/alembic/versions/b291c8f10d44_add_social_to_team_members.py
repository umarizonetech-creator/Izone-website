"""add social column to team_members

Revision ID: b291c8f10d44
Revises: a175626894c3
Create Date: 2026-06-01 18:00:00.000000

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import JSONB


revision: str = 'b291c8f10d44'
down_revision: Union[str, Sequence[str], None] = 'a175626894c3'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('team_members', sa.Column('social', JSONB, nullable=True, server_default='{}'))


def downgrade() -> None:
    op.drop_column('team_members', 'social')
