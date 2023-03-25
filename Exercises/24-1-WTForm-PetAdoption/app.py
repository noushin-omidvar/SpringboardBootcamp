"""Adopt Application"""

import os
from flask import Flask, render_template, redirect, flash, request
from flask_debugtoolbar import DebugToolbarExtension
from forms import AddPetForm
from models import db, connect_db, Pet
from werkzeug.utils import secure_filename


app = Flask(__name__)
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'static/uploads')
# Configuration
app.config.update(
    SQLALCHEMY_DATABASE_URI='postgresql:///adopt',  # database URI
    SQLALCHEMY_TRACK_MODIFICATIONS=False,  # disable modification tracking
    SQLALCHEMY_ECHO=True,  # log SQL statements
    SECRET_KEY='AdOpT',  # secret key for Flask sessions
    DEBUG_TB_INTERCEPT_REDIRECTS=False,  # disable debug toolbar redirects
    UPLOAD_FOLDER=UPLOAD_FOLDER

)

# Debug toolbar
toolbar = DebugToolbarExtension(app)

# Database setup
connect_db(app)
db.create_all()

# Routes


@app.route('/')
def home_page():
    """Show home page with list of pets"""

    pets_avail = Pet.query.filter_by(available=True).all()[:2]
    pets_gone = Pet.query.filter_by(available=False).all()[:2]
    return render_template('home.html', pets_avail=pets_avail, pets_gone=pets_gone)


@app.route('/waiting-pets')
def waiting_page():
    """Show waiting pets page with list of pets"""
    pets_avail = Pet.query.filter_by(available=True).all()
    return render_template('waiting-pets.html', pets_avail=pets_avail)


@app.route('/happy-pets')
def happy_page():
    """Show waiting pets page with list of pets"""
    pets_gone = Pet.query.filter_by(available=False).all()
    return render_template('happy-pets.html', pets_gone=pets_gone)


@app.route('/add', methods=['GET', 'POST'])
def add_pet_form():
    """Add pet form"""
    form = AddPetForm()
    if form.validate_on_submit():

        file = request.files['photo_file']
        if file:
            filename = secure_filename(file.filename)
            print(filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

        # create new Pet object with form data
        pet_data = {key: value for key, value in request.form.items()
                    if key != 'csrf_token'}
        pet = Pet(**pet_data)

        # add to session and commit changes
        db.session.add(pet)
        db.session.commit()
        # show flash message and redirect to home page
        flash('Pet added!')
        return redirect('/')
    # show form template
    return render_template('new-pet.html', form=form)


@app.route('/<int:pet_id>', methods=['GET', 'POST'])
def display_pet(pet_id):
    """Display information on the pet"""
    # retrieve Pet object with specified ID or show 404 error
    pet = Pet.query.get_or_404(pet_id)
    # create form object with existing Pet object data
    form = AddPetForm(obj=pet)
    if form.validate_on_submit():
        # update Pet object with form data
        form.populate_obj(pet)
        db.session.commit()
        # show flash message and redirect to home page
        flash(f"Pet {pet_id} updated!")
        return redirect("/")
    # show pet template
    return render_template('pet.html', pet=pet, form=form)
