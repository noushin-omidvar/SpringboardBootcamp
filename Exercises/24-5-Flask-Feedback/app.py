from flask import Flask, render_template, redirect, request, flash, session
from models import db, connect_db, User
from forms import RegisterForm, LoginForm

app = Flask(__name__)

# Configuration
app.config.update(
    SQLALCHEMY_DATABASE_URI='postgresql:///feedbacks',  # database URI
    SQLALCHEMY_TRACK_MODIFICATIONS=False,  # disable modification tracking
    SQLALCHEMY_ECHO=True,  # log SQL statements
    SECRET_KEY='FeEdBaCk!!!',  # secret key for Flask sessions
    DEBUG_TB_INTERCEPT_REDIRECTS=False,  # disable debug toolbar redirects
)

# connect to the db
connect_db(app)
db.create_all()


@app.route('/')
def show_home():
    """Home Page"""
    return redirect('/register')


@app.route('/register', methods=['GET', 'POST'])
def register():
    """Register Page"""
    form = RegisterForm()

    if form.validate_on_submit():
        new_user_data = {key: value for key, value in request.form.items()
                         if key != 'csrf_token'}

        new_user = User.register(**new_user_data)
        db.session.add(new_user)
        db.session.commit()

        session["user_name"] = new_user.username
        return redirect('/secret')

    return render_template('register.html', form=form)


@app.route('/login', methods=['GET', 'POST'])
def login():
    """Login Page"""
    form = LoginForm()

    if form.validate_on_submit():
        user_name = form.user_name
        password = form.password

        user = User.authenticate(user_name, password)

        if user:
            session["user_name"] = user_name  # keep logged in
            return redirect("/secret")

        else:
            form.username.errors = ["Invalid Username/Password"]

    return render_template('register.html', form=form)


@app.route('/secret')
def show_secret():
    """Only shown to logged in users"""
    if "user_name" not in session:
        flash("You must be logged in to view!")
        return redirect("/")

    return render_template('secret.html')
