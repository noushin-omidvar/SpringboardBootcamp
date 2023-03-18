"""Blogly application."""

from flask import Flask, render_template, request, redirect
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = False  # True
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
# set a 'SECRET_KEY' to enable the Flask session cookies
app.config['SECRET_KEY'] = 'BlOgLy'

toolbar = DebugToolbarExtension(app)


connect_db(app)
db.create_all()


@app.route("/")
def list_users():
    """List users and show add form."""

    users = User.query.all()
    return render_template("listing.html", users=users)


@app.route("/users/new")
def show_form():
    """Show add user form """
    return render_template('Add-user.html')


@app.route("/users/new", methods=["POST"])
def add_users():
    """Add users and redirect to user page."""

    first_name = request.form['first_name']
    last_name = request.form['last_name']
    img_url = request.form.get(
        'img_url') or '/static/images/user-icon.png'
    print('***************', img_url)

    user = User(first_name=first_name, last_name=last_name, img_url=img_url)
    db.session.add(user)
    db.session.commit()

    return redirect(f"/users/{user.id}")


@app.route("/users/<user_id>")
def user_information(user_id):
    user = User.query.get(user_id)
    return render_template("profile.html", user=user)


@app.route("/users/<user_id>/edit")
def show_edit_user(user_id):
    """Show user's edit form."""

    return render_template('edit_form.html', user_id=user_id)


@app.route("/users/<user_id>/edit", methods=["POST"])
def edit_user(user_id):
    """edit users and redirect to user page."""

    user = User.query.get(user_id)

    user.first_name = request.form['first_name']
    user.last_name = request.form['last_name']
    user.img_url = request.form.get(
        'img_url') or '/static/images/user-icon.png'

    db.session.commit()

    print('***************', user.img_url)
    return redirect(f"/users/{user.id}")


@app.route("/users/<user_id>/delete")
def delete_user(user_id):
    """edit users and redirect to user page."""

    user = User.query.get(user_id)
    db.session.delete(user)
    db.session.commit()

    return redirect("/")
