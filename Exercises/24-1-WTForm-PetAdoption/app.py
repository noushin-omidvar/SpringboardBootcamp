"""Adopt Application"""
from flask import Flask, render_template, redirect
from models import db, connect_db, Pet
from flask_debugtoolbar import DebugToolbarExtension
from forms import AddPetForm

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


@app.route('/')
def home_page():
    """Show home page with list of pets"""
    pets = Pet.query.all()
    return render_template('home.html', pets=pets)


@app.route('/add', methods=['GET', 'POST'])
def add_pet_form():
    """Add pet form"""
    form = AddPetForm()
    if form.validate_on_submit():
        name = form.name.data
        species = form.species.data
        photo_url = form.photo_url.data
        age = form.age.data
        notes = form.notes.data
        pet = Pet(name=name, species=species, photo_url=photo_url,
                  age=age, available=True, notes=notes)
        db.session.add(pet)
        db.session.commit()
        return redirect('/')
    else:
        return render_template('new-pet.html', form=form)


@app.route('/<pet_id>', methods=['GET', 'POST'])
def diplay_pet(pet_id):
    """Display information on the pet"""

    pet = Pet.query.get(pet_id)
    form = AddPetForm(obj=pet)

    if form.validate_on_submit():
        pet.name = form.name.data
        pet.species = form.species.data
        pet.photo_url = form.photo_url.data
        pet.age = form.age.data
        pet.notes = form.notes.data
        db.session.commit()
        flash(f"Pet {pet_id} updated!")
        return redirect("/")
    else:
        return render_template('pet.html', pet=pet, form=form)
