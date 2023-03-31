import re
import secrets
from requests import Request
from flask import Flask, render_template, redirect, request, flash, session, abort
from flask_mail import Mail, Message
from models import db, connect_db, User, Feedback
from forms import RegisterForm, LoginForm, FeedbackForm, ForgotForm, ResetForm
from sqlalchemy.exc import SQLAlchemyError, IntegrityError, DataError
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()
app = Flask(__name__)

# Configuration
app.config.update(
    SQLALCHEMY_DATABASE_URI='postgresql:///feedback',  # database URI
    SQLALCHEMY_TRACK_MODIFICATIONS=False,  # disable modification tracking
    SQLALCHEMY_ECHO=True,  # log SQL statements
    SECRET_KEY='FeEdBaCk!!!',  # secret key for Flask sessions
    DEBUG_TB_INTERCEPT_REDIRECTS=False,  # disable debug toolbar redirects
)

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'noush.omidvar@gmail.com'
app.config['MAIL_PASSWORD'] = 'gcchnmvwmadlxdqs'

mail = Mail(app)


# connect to the db
connect_db(app)
db.create_all()


@app.errorhandler(404)
def show_page_not_found(e):
    return render_template('404-page.html'), 404


@app.errorhandler(401)
def show_page_not_found(e):
    return render_template('401-page.html'), 401


@app.route('/')
def show_home():
    """Home Page"""
    return redirect('/register')


@app.route('/register', methods=['GET', 'POST'])
def register():
    if "username" in session:
        return redirect(f"/users/{session['username']}")

    """Register Page"""
    form = RegisterForm()

    if form.validate_on_submit():
        new_user_data = {key: value for key, value in request.form.items()
                         if key != 'csrf_token'}

        new_user = User.register(**new_user_data)

        try:
            db.session.add(new_user)
            db.session.commit()
            session["username"] = new_user.username
            session["is_admin"] = True
            return redirect(f"/users/{new_user.username}")
        except IntegrityError as e:
            db.session.rollback()
            error = str(e.__dict__.get('orig'))
            if 'username' in error and 'unique constraint' in error.lower():
                form.username.errors.append('This username is not availbale')
            elif 'email' in error and 'unique constraint' in error.lower():
                form.email.errors.append('This email has been used before')
            return render_template('register.html', form=form)

    return render_template('register.html', form=form)


@app.route('/login', methods=['GET', 'POST'])
def login():

    if "username" in session:
        return redirect(f"/users/{session['username']}")

    """Login Page"""
    form = LoginForm()

    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data

        user = User.authenticate(username, password)

        if user:
            session["username"] = username  # keep logged in
            if user.is_admin == True:
                session["is_admin"] = user.is_admin
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
        abort(401)

    user = User.query.get_or_404(username)
    first_name = user.first_name
    last_name = user.last_name
    email = user.email

    user_data = {'User Name': username, 'First name': first_name,
                 "Last name": last_name, "E-mail": email}

    feedbacks = user.feedbacks
    return render_template('user.html', user_data=user_data, feedbacks=feedbacks)


@app.route('/users/<username>/delete', methods=['POST'])
def delete_user(username):
    """Delete User"""
    if session['username'] != username or not session["is_admin"]:
        return redirect('/')

    user = User.query.get_or_404(username)
    db.session.delete(user)
    db.session.commit()
    return redirect('/')


@app.route('/users/<username>/feedback/add', methods=['GET', 'POST'])
def show_feedback_form(username):
    if session['username'] != username or not session["is_admin"]:
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
    feedback = Feedback.query.get_or_404(feedback_id)

    if session['username'] != feedback.username or not session["is_admin"]:
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
    feedback = Feedback.query.get_or_404(feedback_id)
    """Delete feedback"""
    if session['username'] != feedback.username or not session["is_admin"]:
        return redirect('/')

    db.session.delete(feedback)
    db.session.commit()
    return redirect(f'/users/{feedback.username}')


@app.route('/forgot-password', methods=['GET', 'POST'])
def forgot_password():
    form = ForgotForm()
    if form.validate_on_submit():
        email = form.email.data
        user = User.query.filter_by(email=email).first()

        if user:

            token = secrets.token_urlsafe(10)
            user.reset_token = token
            db.session.commit()
            url = f'http://127.0.0.1:5000/reset_password/{token}'

            msg = Message("Hello",
                          sender="n.omidvar8@yahoo.com",
                          recipients=[email])

            msg.body = f'''To reset your password, visit the following link: {url}
            If you did not make this request then simply ignore this email and no changes will be made.
'''
            mail.send(msg)
            flash('An email has been sent with instructions to reset your password.')
            return redirect('/login')
        else:
            flash('There is no account with that email. You must register first.')
            return redirect('/register')

    return render_template('forgot-password.html', form=form)


@app.route('/reset_password/<token>', methods=['GET', 'POST'])
def reset_password(token):
    user = User.query.filter_by(reset_token=token).first()
    form = ResetForm()
    if not user:
        flash('Invalid or expired token. Please try again.')
        return redirect('/forgot-password')

    if request.method == 'POST':
        password = form.password.data
        confirm_password = form.confirm_password.data

        if password != confirm_password:
            flash('Passwords do not match. Please try again.')
            return redirect('/reset_password', token=token)

        # Update user password and delete reset token
        user.password = bcrypt.generate_password_hash(password=password)
        user.reset_token = None
        db.session.commit()

        flash('Your password has been reset. You can now log in with your new password.')
        return redirect('/login')

    return render_template('reset_password.html', form=form)
