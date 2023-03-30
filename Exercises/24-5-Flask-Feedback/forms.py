from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, EmailField
from wtforms.validators import InputRequired


class RegisterForm(FlaskForm):
    """Registeration form"""

    username = StringField("Username", validators=[InputRequired()])
    password = PasswordField("Password", validators=[InputRequired()])
    email = EmailField("Email", validators=[InputRequired()])
    first_name = StringField("First name", validators=[InputRequired()])
    last_name = StringField("Last name", validators=[InputRequired()])


class LoginForm(FlaskForm):
    """Login form"""

    username = StringField("Username", validators=[InputRequired()])
    password = PasswordField("Password", validators=[InputRequired()])


class FeedbackForm(FlaskForm):
    """Feedback form"""

    title = StringField("Title", validators=[InputRequired()])
    content = StringField("Content", validators=[InputRequired()])
