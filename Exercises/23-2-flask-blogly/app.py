"""Blogly application."""

from flask import Flask, render_template, request, redirect
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User, Post

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


@app.errorhandler(404)
def page_not_found(e):
    # note that we set the 404 status explicitly
    return render_template('404.html'), 404


@app.route('/')
def root():
    """Homepage redirects to list of users."""

    return redirect("/users")


@app.route("/users")
def list_users():
    """List users and show add form."""

    users = User.query.order_by(User.last_name, User.first_name).all()
    return render_template("users.html", users=users)


@app.route("/users/new")
def show_form():
    """Show add user form """
    return render_template('new-user.html')


@app.route("/users/new", methods=["POST"])
def add_users():
    """Add users and redirect to user page."""

    first_name = request.form['first_name']
    last_name = request.form['last_name']
    img_url = request.form.get(
        'img_url') or '/static/images/user-icon.png'

    user = User(first_name=first_name, last_name=last_name, img_url=img_url)
    db.session.add(user)
    db.session.commit()

    return redirect(f"/users/{user.id}")


@app.route("/users/<user_id>")
def user_information(user_id):

    user = User.query.get_or_404(user_id)
    posts = user.posts
    return render_template("profile.html", user=user, posts=posts)


@app.route("/users/<user_id>/edit")
def show_edit_user(user_id):
    """Show user's edit form."""
    user = User.query.get(user_id)
    return render_template('user-edit.html', user=user)


@app.route("/users/<user_id>/edit", methods=["POST"])
def edit_user(user_id):
    """edit users and redirect to user page."""

    user = User.query.get(user_id)

    user.first_name = request.form['first_name']
    user.last_name = request.form['last_name']
    user.img_url = request.form.get(
        'img_url') or '/static/images/user-icon.png'

    db.session.commit()

    return redirect(f"/users/{user.id}")


@app.route("/users/<user_id>/delete")
def delete_user(user_id):
    """delet users and redirect to home page."""

    user = User.query.get(user_id)
    db.session.delete(user)
    db.session.commit()

    return redirect("/")


@app.route("/users/<user_id>/posts/new")
def show_add_post_form(user_id):
    """Show form to add a post for that user."""
    user = User.query.get(user_id)
    return render_template('new-post.html', user=user)


@app.route("/users/<user_id>/posts/new", methods=['POST'])
def add_post(user_id):
    """Handle add form; add post and redirect to the user detail page."""

    title = request.form['title']
    content = request.form['content']

    post = Post(title=title, content=content, user_id=user_id)
    db.session.add(post)
    db.session.commit()

    return redirect(f"/users/{user_id}")


@app.route("/posts/<post_id>")
def show_post(post_id):
    """Show a post.
    Show buttons to edit and delete the post."""
    post = Post.query.get_or_404(post_id)
    return render_template('post.html', post=post)


@app.route("/posts/<post_id>/edit")
def show_post_edit_form(post_id):
    """Show form to edit a post, and to cancel (back to user page)."""
    post = Post.query.get(post_id)
    return render_template('post-edit.html', post=post)


@app.route("/posts/<post_id>/edit", methods=['POST'])
def edit_post(post_id):
    """Handle editing of a post. Redirect back to the post view."""
    post = Post.query.get(post_id)
    post.title = request.form['title']
    post.content = request.form['content']

    db.session.commit()

    return redirect(f"/users/{post.user_id}")


@app.route("/posts/<post_id>/delete", methods=['POST'])
def delete_post(post_id):
    """Delete the post."""
    post = Post.query.get(post_id)
    user_id = post.user_id
    db.session.delete(post)
    db.session.commit()

    return redirect(f"/users/{user_id}")
