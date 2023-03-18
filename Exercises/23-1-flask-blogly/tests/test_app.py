from unittest import TestCase

from app import app
from models import db, User

# Set up the testing environment
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_test'
app.config['SQLALCHEMY_ECHO'] = False
app.config['TESTING'] = True
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

# Create the database tables
db.drop_all()
db.create_all()

# Define the test case class


class UserViewTestCase(TestCase):
    """Tests for views for Users"""

    def setUp(self):
        """Add sample users"""

        # Delete any existing users from the database
        User.query.delete()

        # Add a sample user to the database
        user = User(first_name='Jane', last_name='Doe')
        db.session.add(user)
        db.session.commit()

        # Save the ID of the added user for later use
        self.user_img = user.img_url
        self.user_id = user.id

    def tearDown(self):
        """Clean up any field transaction"""

        # Roll back any pending transactions
        db.session.rollback()

    def test_list_users(self):
        # Test that the home page displays the list of users
        with app.test_client() as client:
            resp = client.get('/')
            html = resp.get_data(as_text=True)

            # Check that the response status code is 200
            self.assertEqual(resp.status_code, 200)

            # Check that the HTML response includes the name of the sample user
            self.assertIn('Jane Doe', html)

    def test_user_profile(self):
        # Test that the user profile page displays the correct information for the sample user
        with app.test_client() as client:
            resp = client.get('/users/1')
            html = resp.get_data(as_text=True)

            # Check that the response status code is 200
            self.assertEqual(resp.status_code, 200)

            # Check that the HTML response includes the name and image of the sample user
            self.assertIn('<h1>Jane Doe</h1>', html)
            self.assertIn(self.user_img, html)

    def test_show_add_users_form(self):
        # Test that the "add user" form is displayed correctly
        with app.test_client() as client:
            resp = client.get('/users/new')
            html = resp.get_data(as_text=True)

            # Check that the response status code is 200
            self.assertEqual(resp.status_code, 200)

            # Check that the HTML response includes the "add user" form
            self.assertIn('<h1>Create a user</h1>', html)

    def test_add_user(self):
        # Test that a new user can be added to the database and that the user profile page is displayed correctly
        with app.test_client() as client:

            # Submit the "add user" form with the name "John Doe"
            resp = client.post(
                '/users/new', data={'first_name': 'John', 'last_name': 'Doe'})

            # Check that the response status code is 302 (redirect)
            self.assertEqual(resp.status_code, 302)

            # Check that the redirect location is the user 2 profile page
            self.assertEqual(resp.location, "http://localhost/users/2")

            # Submit the "add user" form with the name "John Doe" and follow the redirect to the user profile page
            resp = client.post(
                '/users/new', data={'first_name': 'John', 'last_name': 'Doe'}, follow_redirects=True)
            html = resp.get_data(as_text=True)

            # Check that the response status code is 200
            self.assertEqual(resp.status_code, 200)

            # Check that the HTML response includes the name
            self.assertIn('<h1>John Doe</h1>', html)
            self.assertIn(self.user_img, html)

    def test_delete_user(self):
        # Test that a new user can be added to the database and that the user profile page is displayed correctly
        with app.test_client() as client:

            resp = client.get(
                '/users/1/delete', follow_redirects=True)
            html = resp.get_data(as_text=True)

            # Check that the response status code is 200
            self.assertEqual(resp.status_code, 200)

            # Check that the HTML response not includes the ddeleted user name
            self.assertNotIn('John Doe', html)
