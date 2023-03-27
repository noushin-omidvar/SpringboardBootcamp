"""Flask app for Cupcakes"""
from flask import Flask, jsonify
from models import db, connect_db, Cupcake
from flask_debugtoolbar import DebugToolbarExtension


app = Flask(__name__)

# Configuration
app.config.update(
    SQLALCHEMY_DATABASE_URI='postgresql:///cupcakes',  # database URI
    SQLALCHEMY_TRACK_MODIFICATIONS=False,  # disable modification tracking
    SQLALCHEMY_ECHO=True,  # log SQL statements
    SECRET_KEY='CuPCaKeS!!!',  # secret key for Flask sessions
    DEBUG_TB_INTERCEPT_REDIRECTS=False,  # disable debug toolbar redirects
)

# Debug toolbar
toolbar = DebugToolbarExtension(app)

# Database setup
connect_db(app)

# Routes


@app.route('/api/cupcakes')
def get_cupcakes():
    cupcakes = Cupcake.query.all()
    serialized = [cupcake.serialize() for cupcake in cupcakes]
    return jsonify(cupcakes=serialized)
