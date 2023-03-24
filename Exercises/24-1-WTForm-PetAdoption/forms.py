from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, TextAreaField, SelectField
from wtforms.validators import InputRequired, Optional, URL, NumberRange


class AddPetForm(FlaskForm):

    name = StringField("Pet name", validators=[InputRequired()])
    species = SelectField("Species", choices=[
                          ('dog', 'Dog'), ('cat', 'Cat'), ('porcupine', 'Porcupine')])
    photo_url = StringField("Photo URL", validators=[URL()])
    age = FloatField("Age", validators=[
                     Optional(), NumberRange(min=0, max=30)])
    notes = TextAreaField("Notes")
