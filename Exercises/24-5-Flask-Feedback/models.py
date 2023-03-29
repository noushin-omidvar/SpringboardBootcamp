from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def db_connect(app):
    """conect to database"""

    db.app = app
    db.init_app(app)


class User(db):
    """ User table"""

    __tablename__ = "users"

    username = db.Column(db.String(20),
                         primary_key=True,
                         unique=True,
                         nullable=False)

    password = db.Column(db.String,
                         nullable=False)

    email = db.Column(db.String(50),
                      unique=True,
                      nullable=False)

    first_name = db.Column(db.string(30),
                           nullable=False)

    last_name = db.Column(db.string(30),
                          nullable=False)
