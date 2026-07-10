"""create initial tables

Revision ID: 00956e7903ab
Revises: a175626894c3
Create Date: 2026-06-01 18:07:23.115895

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '00956e7903ab'
down_revision: Union[str, Sequence[str], None] = 'a175626894c3'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
