from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, TextAreaField, SelectField
from wtforms.validators import InputRequired, Optional, URL, NumberRange


class AddPetForm(FlaskForm):
    """A form for adding or editing a pet"""

    # name field for the pet
    name = StringField("Pet name", validators=[InputRequired()])

    # species dropdown field for the pet
    species = SelectField("Species", choices=[
                          ('dog', 'Dog'), ('cat', 'Cat'), ('porcupine', 'Porcupine')])

    # photo URL field for the pet
    photo_url = StringField("Photo URL", validators=[URL()])

    # age field for the pet, optional and can only be between 0 and 30
    age = FloatField("Age", validators=[
                     Optional(), NumberRange(min=0, max=30)])

    # notes field for the pet
    notes = TextAreaField("Notes")
