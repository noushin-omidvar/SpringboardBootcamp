"""Seed file to make sample data for pets db."""

from models import db, Pet
from app import app

# Create all tables
db.drop_all()
db.create_all()

# If table isn't empty, empty it
Pet.query.delete()


lucy = Pet(name="Lucy", species='dog', age=7,
           photo_url="https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/60775111/4/?bust=1678478788&width=720", available=True)

spelt = Pet(name="Spelt", species="cat", age=1,
            photo_url="https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/60191621/1/?bust=1677529141&width=720", available=True)


holmes = Pet(name="Holmes", species="dog", age=5,
             photo_url="https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/60024854/1/?bust=1676989779&width=720")

kittie = Pet(name="Kittie", species="cat", age=2,
             photo_url="https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/60126788/1/?bust=1677354415&width=720", available=False)

cloe = Pet(name="Cloe", species="porcupine", age=1,
           photo_url="https://animals.sandiegozoo.org/sites/default/files/2016-09/animals_hero_porcupine.jpg", available=False)

sweetie = Pet(name="Sweetie P", species="cat", age=1,
              photo_url="https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/60982317/5/?bust=1678818983&width=720", available=True)


db.session.add_all([lucy, spelt, holmes, kittie, cloe, sweetie])
db.session.commit()
