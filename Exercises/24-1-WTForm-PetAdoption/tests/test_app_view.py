from unittest import TestCase

from app import app
from models import db, Pet

# Use test database
app.config['SQLALCHEMY_DATABASE_URL'] = 'postgresql:///adopt_test'
app.config['SQLALCHEMY_ECHO'] = False

# Make Flask errors be real errors, rather than html pages with error info
app.config['TESTING'] = True

# This is a bit of hack, but don't use Flask DebugToolbar
app.config['DeBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

# disable CSRF checking
app.config['WTF_CSRF_ENABLED'] = False

db.drop_all()
db.create_all()


class PetModelTestCase(TestCase):
    """Test for model for Pets"""

    def setUp(self):
        """Clean up any existing pet"""

        Pet.query.delete()

        pet = Pet(name="Lucy", species='dog',
                  photo_url="https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/60775111/4/?bust=1678478788&width=720", available=True)

        db.session.add(pet)
        db.session.commit()

        self.pet_id = pet.id

    def tearDown(self):
        """Clean up any fouled transaction"""

        db.session.rollback()

    def test_home_Pet(self):
        with app.test_client() as client:
            resp = client.get('/')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('Lucy', html)

    def test_show_add_form(self):
        with app.test_client() as client:
            resp = client.get('/add')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('form id="add-pet-form"', html)

    def test_add_pet(self):
        with app.test_client() as client:
            d = {"name": "Lin", "species": "dog",
                 "photo_url": "alaki", "age": 6}
            resp = client.post('/add', data=d, follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('Lin', html)
