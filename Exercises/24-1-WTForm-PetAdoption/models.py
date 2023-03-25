from flask_sqlalchemy import SQLAlchemy

# create the SQLAlchemy instance
db = SQLAlchemy()


def connect_db(app):
    """Connect to database"""

    # bind the SQLAlchemy instance to the Flask app
    db.app = app
    db.init_app(app)


class Pet(db.Model):
    """Pet model"""

    # define the name of the table in the database
    __tablename__ = "pets"

    # define the columns of the table
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=False)
    species = db.Column(db.String, nullable=False)
    photo_url = db.Column(db.String, nullable=True)
    photo_file = db.Column(db.LargeBinary, nullable=True)
    age = db.Column(db.Integer, nullable=True)
    notes = db.Column(db.String, nullable=True)
    available = db.Column(db.Boolean, nullable=False, default=True)
