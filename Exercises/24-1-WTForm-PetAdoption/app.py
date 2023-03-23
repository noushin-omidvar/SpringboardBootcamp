from flask import Flask, render_template
from models import db, connect_db, Pet
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///adopt'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

# set a 'SECRET_KEY' to enable the Flask session cookies
app.config['SECRET_KEY'] = 'AdOpT'

toolbar = DebugToolbarExtension(app)

# connecting to the database
connect_db(app)
db.create_all()
