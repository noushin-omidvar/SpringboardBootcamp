from unittest import TestCase

from app import app
from models import db, Cupcake

# Use test database and don't clutter tests with SQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes_test'
app.config['SQLALCHEMY_ECHO'] = False

# Make Flask errors be real errors, rather than HTML pages with error info
app.config['TESTING'] = True

db.drop_all()
db.create_all()


CUPCAKE_DATA = {
    "flavor": "TestFlavor",
    "size": "TestSize",
    "rating": 5,
    "image": "http://test.com/cupcake.jpg"
}

CUPCAKE_DATA_2 = {
    "flavor": "TestFlavor2",
    "size": "TestSize2",
    "rating": 10.0,
    "image": "http://test.com/cupcake2.jpg"
}


class CupcakeViewsTestCase(TestCase):
    """Tests for views of API."""

    def setUp(self):
        """Make demo data."""

        Cupcake.query.delete()

        cupcake = Cupcake(**CUPCAKE_DATA)
        db.session.add(cupcake)
        db.session.commit()

        self.cupcake = cupcake

    def tearDown(self):
        """Clean up fouled transactions."""

        db.session.rollback()

    def test_list_cupcakes(self):
        with app.test_client() as client:
            resp = client.get("/api/cupcakes")

            self.assertEqual(resp.status_code, 200)

            data = resp.json
            self.assertEqual(data, {
                "cupcakes": [
                    {
                        "id": self.cupcake.id,
                        "flavor": "TestFlavor",
                        "size": "TestSize",
                        "rating": 5,
                        "image": "http://test.com/cupcake.jpg"
                    }
                ]
            })

    def test_get_cupcake(self):
        with app.test_client() as client:
            url = f"/api/cupcakes/{self.cupcake.id}"
            resp = client.get(url)

            self.assertEqual(resp.status_code, 200)
            data = resp.json
            self.assertEqual(data, {
                "cupcake": {
                    "id": self.cupcake.id,
                    "flavor": "TestFlavor",
                    "size": "TestSize",
                    "rating": 5,
                    "image": "http://test.com/cupcake.jpg"
                }
            })

    def test_create_cupcake(self):
        with app.test_client() as client:
            url = "/api/cupcakes"
            resp = client.post(url, json=CUPCAKE_DATA_2)

            self.assertEqual(resp.status_code, 201)

            data = resp.json

            # don't know what ID we'll get, make sure it's an int & normalize
            self.assertIsInstance(data['cupcake']['id'], int)
            del data['cupcake']['id']

            self.assertEqual(data, {
                "cupcake": {
                    "flavor": "TestFlavor2",
                    "size": "TestSize2",
                    "rating": 10.0,
                    "image": "http://test.com/cupcake2.jpg"
                }
            })

            self.assertEqual(Cupcake.query.count(), 2)

    def test_patch_cupcake(self):
        with app.test_client() as client:
            id = self.cupcake.id
            url = f"/api/cupcakes/{id}"
            resp = client.patch(url, json=CUPCAKE_DATA_2)

            self.assertEqual(resp.status_code, 200)

            data = resp.json

            # don't know what ID we'll get, make sure it's an int & normalize
            self.assertIsInstance(data['cupcake']['id'], int)
            del data['cupcake']['id']
            self.assertEqual(data, {
                "cupcake": {
                    "flavor": "TestFlavor2",
                    "size": "TestSize2",
                    "rating": 10.0,
                    "image": "http://test.com/cupcake2.jpg"
                }
            })

            self.assertEqual(Cupcake.query.count(), 1)

    def test_delete_cupcake(self):
        initial_count = Cupcake.query.count()
        with app.test_client() as client:
            id = self.cupcake.id
            url = f"/api/cupcakes/{id}"
            resp = client.delete(url, json=CUPCAKE_DATA_2)

            self.assertEqual(resp.status_code, 200)

            data = resp.json
            self.assertEqual(data, {
                "message": "Deleted"
            })

            self.assertEqual(Cupcake.query.count(), initial_count-1)

    def test_get_cupcake_not_found(self):
        """Test that GET /api/cupcakes/<cupcake_id> returns 404 if the cupcake doesn't exist"""
        with app.test_client() as client:
            response = client.get('/api/cupcakes/999')
            data = response.get_json()
            self.assertEqual(response.status_code, 404)
            self.assertEqual(
                data['error'], '404 Not Found: The requested URL was not found on the server. If you entered the URL manually please check your spelling and try again.')

    def test_update_cupcake_not_found(self):
        """Test that PATCH /api/cupcakes/<cupcake_id> returns 404 if the cupcake doesn't exist"""
        with app.test_client() as client:
            response = client.patch('/api/cupcakes/999',
                                    json={'flavor': 'Updated Flavor'})
            data = response.get_json()
            self.assertEqual(response.status_code, 404)
            self.assertEqual(
                data['error'], '404 Not Found: The requested URL was not found on the server. If you entered the URL manually please check your spelling and try again.')

    def test_delete_cupcake_not_found(self):
        """Test that DELETE /api/cupcakes/<cupcake_id> returns 404 if the cupcake doesn't exist"""
        with app.test_client() as client:
            response = client.delete('/api/cupcakes/999')
            data = response.get_json()
            self.assertEqual(response.status_code, 404)
            self.assertEqual(
                data['error'], '404 Not Found: The requested URL was not found on the server. If you entered the URL manually please check your spelling and try again.')
