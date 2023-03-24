from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, TextAreaField
from wtforms.validators import InputRequired, Optional, Email


class AddPetForm(FlaskForm):

    name = StringField("Pet name", validators=[InputRequired()])
    species = StringField("Species")
    photo_url = StringField("Photo URL")
    age = FloatField("Age", validators=[Optional()])
    notes = TextAreaField("Notes")
