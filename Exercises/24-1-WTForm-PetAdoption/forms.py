from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, TextAreaField, SelectField, FileField, ValidationError
from wtforms.validators import InputRequired, Optional, URL, NumberRange, AnyOf
from werkzeug.utils import secure_filename


class AddPetForm(FlaskForm):
    """A form for adding or editing a pet"""

    # name field for the pet
    name = StringField("Pet name", validators=[InputRequired()])

    # species dropdown field for the pet
    species = SelectField(
        "Species",
        choices=[
            ("cat", "Cat"),
            ("dog", "Dog"),
            ("porcupine", "Porcupine")
        ],
        validators=[InputRequired(), AnyOf(["cat", "dog", "porcupine"])]
    )
    # photo URL field for the pet
    photo_url = StringField("Photo URL", validators=[Optional(), URL()])

    photo_file = FileField("Photo File", validators=[Optional()])
    # age field for the pet, optional and can only be between 0 and 30
    age = FloatField("Age", validators=[
                     Optional(), NumberRange(min=0, max=30)])

    # notes field for the pet
    notes = TextAreaField("Notes")

    def validate(self, extra_validators=None):
        rv = FlaskForm.validate(self)
        if not rv:
            return False

        if self.photo_url.data and self.photo_file.data:
            self.photo_url.errors.append(
                "You can only provide a photo URL or upload a photo, not both.")
            self.photo_file.errors.append(
                "You can only provide a photo URL or upload a photo, not both.")
            return False

        if not self.photo_url.data and not self.photo_file.data:
            self.photo_url.errors.append(
                "You must provide either a photo URL or upload a photo.")
            self.photo_file.errors.append(
                "You must provide either a photo URL or upload a photo.")
            return False

        if self.photo_file.data:
            filename = secure_filename(self.photo_file.data.filename)
            extension = filename.split(".")[-1]
            if extension not in ["jpg", "jpeg", "png", "gif"]:
                self.photo_file.errors.append(
                    "File must be a JPG, JPEG, PNG, or GIF.")
                return False

            self.photo_file.data.filename = self.name.data + "." + extension

        return True
