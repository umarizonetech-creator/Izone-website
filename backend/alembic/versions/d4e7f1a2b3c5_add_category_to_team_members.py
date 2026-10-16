"""add category to team_members

Revision ID: d4e7f1a2b3c5
Revises: c31b9e7a4d12
Create Date: 2025-01-01 00:00:00.000000

"""
from alembic import op
import sqlalchemy as sa

revision = 'd4e7f1a2b3c5'
down_revision = 'c31b9e7a4d12'
branch_labels = None
depends_on = None


def upgrade():
    conn = op.get_bind()
    inspector = sa.inspect(conn)
    columns = [c['name'] for c in inspector.get_columns('team_members')]
    if 'category' not in columns:
        op.add_column('team_members', sa.Column('category', sa.String(100), nullable=True, server_default=''))


def downgrade():
    conn = op.get_bind()
    inspector = sa.inspect(conn)
    columns = [c['name'] for c in inspector.get_columns('team_members')]
    if 'category' in columns:
        op.drop_column('team_members', 'category')
