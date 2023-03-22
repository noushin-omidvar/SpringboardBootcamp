"""Models for Blogly."""

from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)


class User(db.Model):
    """User"""

    __tablename__ = "users"

    id = db.Column(
        db.Integer,
        primary_key=True,
        autoincrement=True)

    first_name = db.Column(db.String,
                           nullable=False,
                           )

    last_name = db.Column(db.String,
                          nullable=False,
                          )

    img_url = db.Column(db.String,
                        nullable=False,
                        default='/static/images/user-icon.png'
                        )
    posts = db.relationship('Post', backref='user', cascade="all, delete")

    def __repr__(self):
        """Show info about user."""

        p = self
        return f"It's user {p.id}: {p.first_name} {p.last_name}"

    def get_full_name(self):
        '''return user's full name'''
        return self.first_name + ' ' + self.last_name

    @property
    def full_name(self):
        return self.get_full_name()


class Post(db.Model):
    """Post"""

    __tablename__ = "posts"

    id = db.Column(
        db.Integer,
        primary_key=True,
        autoincrement=True)

    title = db.Column(db.String,
                      nullable=False,
                      )

    content = db.Column(db.String,
                        nullable=False,
                        )

    created_at = db.Column(db.DateTime,
                           nullable=False,
                           default=datetime.now())

    user_id = db.Column(db.Integer,
                        db.ForeignKey('users.id'))

    def __repr__(self):
        """Show info about user."""

        p = self
        return f"It's post {p.id} from {p.user.full_name}"

    @property
    def friendly_date(self):
        """Return nicely-formatted date."""

        return self.created_at.strftime("%a %b %-d  %Y, %-I:%M %p")


class Tag(db.Model):

    __tablename__ = "tags"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    name = db.Column(
        db.String,
        nullable=False,
        unique=True
    )

    posts = db.relationship('Post',
                            secondary="post_tags",
                            backref='tags')


class PostTag(db.Model):
    """Mapping of a post to a tag"""

    __tablename__ = "post_tags"

    post_id = db.Column(
        db.Integer,
        db.ForeignKey("posts.id"),
        primary_key=True
    )

    tag_id = db.Column(
        db.Integer,
        db.ForeignKey("tags.id"),
        primary_key=True
    )
