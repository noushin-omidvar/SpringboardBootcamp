"""Seed file to make sample data for pets db."""

from models import db, Pet
from app import app

# Create all tables
db.drop_all()
db.create_all()

# If table isn't empty, empty it
Pet.query.delete()
