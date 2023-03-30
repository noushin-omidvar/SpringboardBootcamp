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

        session["username"] = new_user.username
        return redirect(f"/users/{new_user.username}")

    return render_template('register.html', form=form)


@app.route('/login', methods=['GET', 'POST'])
def login():
    """Login Page"""
    form = LoginForm()

    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data

        print("**********", username)
        user = User.authenticate(username, password)

        if user:
            session["username"] = username  # keep logged in

            return redirect(f"/users/{username}")

        else:
            form.username.errors = ["Invalid Username/Password"]
    print('***********We also passed this')
    return render_template('register.html', form=form)


@app.route('/logout')
def logout():
    session.pop("username")
    return redirect('/')


@app.route('/users/<username>')
def show_user(username):
    """Only shown to logged in users"""

    if "username" not in session:
        flash("You must be logged in to view!")
        return redirect("/")

    user = User.query.filter_by(username=username).first()
    first_name = user.first_name
    last_name = user.last_name
    email = user.email

    user_data = {'User Name': username, 'First name': first_name,
                 "Last name": last_name, "E-mail": email}
    return render_template('user.html', user_data=user_data)
