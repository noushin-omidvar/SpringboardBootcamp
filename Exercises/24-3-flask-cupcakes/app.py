"""Flask app for Cupcakes"""
from flask import Flask, jsonify, render_template, request
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


@app.errorhandler(404)
def page_not_found(e):
    return render_template('404_page.html'), 404

# Routes


@app.route('/api/cupcakes')
def get_cupcakes():
    """Get data about all cupcakes."""
    cupcakes = Cupcake.query.all()
    serialized = [cupcake.serialize() for cupcake in cupcakes]
    return jsonify(cupcakes=serialized)


@app.route('/api/cupcakes/<cupcake_id>')
def get_cupcake(cupcake_id):
    """Get data about a single cupcake."""
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    serialized = cupcake.serialize()
    return jsonify(cupcake=serialized)


@app.route('/api/cupcakes', methods=['POST'])
def create_cupcake():
    """Create a cupcake with flavor, size, rating
      and image data from the body of the request."""

    flavor = request.json.get('flavor')
    size = request.json.get('size')
    rating = request.json.get('rating')
    image = request.json.get('image')

    print(flavor)
    new_cupcake = Cupcake(flavor=flavor,
                          size=size,
                          rating=rating,
                          image=image
                          )

    db.session.add(new_cupcake)
    db.session.commit()

    serialized = new_cupcake.serialize()
    return (jsonify(cupcake=serialized), 201)
