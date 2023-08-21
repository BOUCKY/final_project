"""Wish Table

Revision ID: f0c4fe94ef55
Revises: 089109849066
Create Date: 2023-08-21 14:09:59.067326

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f0c4fe94ef55'
down_revision = '089109849066'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('wishes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('place_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['place_id'], ['places.id'], name=op.f('fk_wishes_place_id_places')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_wishes_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('wishes')
    # ### end Alembic commands ###