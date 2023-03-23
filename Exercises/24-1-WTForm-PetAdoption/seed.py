"""Seed file to make sample data for pets db."""

from models import db, Pet
from app import app

# Create all tables
db.drop_all()
db.create_all()

# If table isn't empty, empty it
Pet.query.delete()


lucy = Pet(name="Lucy", species='dog',
           photo_url="https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/60775111/4/?bust=1678478788&width=720", available=True)

holmes = Pet(name="Holmes", species="dog",
             photo_url="https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/60024854/1/?bust=1676989779&width=720")

db.session.add_all([lucy, holmes])
db.session.commit()
