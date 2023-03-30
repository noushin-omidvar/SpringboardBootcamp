from flask import Flask, render_template, redirect, request, flash, session
from models import db, connect_db, User, Feedback
from forms import RegisterForm, LoginForm, FeedbackForm

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

        user = User.authenticate(username, password)

        if user:
            session["username"] = username  # keep logged in

            return redirect(f"/users/{username}")

        else:
            form.username.errors = ["Invalid Username/Password"]
    return render_template('login.html', form=form)


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

    feedbacks = user.feedbacks
    print(feedbacks)
    return render_template('user.html', user_data=user_data, feedbacks=feedbacks)


@app.route('/users/<username>/delete', methods=['POST'])
def delete_user(username):
    """Delete User"""
    if session['username'] != username:
        return redirect('/')

    user = User.query.get(username)
    db.session.delete(user)
    db.session.commit()
    return redirect('/')


@app.route('/users/<username>/feedback/add', methods=['GET', 'POST'])
def show_feedback_form(username):
    if session['username'] != username:
        return redirect('/')

    form = FeedbackForm()
    if form.validate_on_submit():
        title = form.title.data
        content = form.content.data

        feedback = Feedback(title=title, content=content, username=username)
        db.session.add(feedback)
        db.session.commit()

        return redirect(f'/users/{username}')

    return render_template('feedback-add.html', form=form)


@app.route('/feedback/<feedback_id>/update', methods=['GET', 'POST'])
def edit_feedback(feedback_id):
    feedback = Feedback.query.get(feedback_id)

    if session['username'] != feedback.username:
        return redirect('/')

    form = FeedbackForm()
    if form.validate_on_submit():

        feedback.title = form.title.data
        feedback.content = form.content.data

        db.session.commit()

        return redirect(f'/users/{feedback.username}')

    return render_template('feedback-edit.html', form=form, feedback=feedback)


@app.route('/feedback/<feedback_id>/delete', methods=['POST'])
def delete_feedback(feedback_id):
    feedback = Feedback.query.get(feedback_id)
    """Delete feedback"""
    if session['username'] != feedback.username:
        return redirect('/')

    db.session.delete(feedback)
    db.session.commit()
    return redirect(f'/users/{feedback.username}')
