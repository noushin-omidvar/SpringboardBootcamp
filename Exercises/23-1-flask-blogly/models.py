"""Models for Blogly."""

from flask_sqlalchemy import SQLAlchemy

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
                        default='/static/images/user-icon.png')

    def __repr__(self):
        """Show info about user."""

        p = self
        return f"It's user {p.id}: {p.first_name} {p.last_name}"
