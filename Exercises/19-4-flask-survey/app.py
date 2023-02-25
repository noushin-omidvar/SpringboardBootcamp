"""
# This code defines a Flask web application for administering and completing surveys. 
The app presents a list of available surveys, allows users to select a survey, 
and records their responses as they navigate through the survey questions.
 The code was written by Noushin Omidvar.

"""

import json
from surveys import surveys
from flask_debugtoolbar import DebugToolbarExtension
from flask import Flask, render_template, request, redirect, flash, session, make_response

# Define constants for keys used in session and cookies
RESPONSES_KEY = "responses"
Q_NUM_KEY = "q_num"
SURVEY_KEY = 'survey'
SURVEY_Q_NUM_KEY = 'NUM_QS'

# Create Flask app and configure settings
app = Flask(__name__)
app.config['SECRET_KEY'] = "oh-so-secret"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

# Enable Flask Debug Toolbar
debug = DebugToolbarExtension(app)


@app.route('/')
def select_survey():
    """Display page where user can select a survey to take."""
    return render_template('select_survey.html', surveys=surveys)


@app.route('/set_survey')
def set_survey():
    """Set the selected survey in the session and redirect to the start page."""
    if not request.args.get('survey'):
        return redirect('/')
    session[SURVEY_KEY] = request.args.get('survey')
    return redirect('/start')


@app.route('/start', methods=['get'])
def show_survey_start():
    """Display the start page for the selected survey."""

    if not (session.get(SURVEY_KEY, "")):
        return redirect('/')

    selected_survey = surveys[session[SURVEY_KEY]]

    # Set the number of questions in the survey for use in the session
    session[SURVEY_Q_NUM_KEY] = len(selected_survey.questions)

    # Check if user has already completed this survey
    if request.cookies.get(session[SURVEY_KEY]):
        flash(f"You have already completed {session[SURVEY_KEY]} survey.")

        # Retrieve previous survey responses from cookies
        survey_data = request.cookies.get('survey_data')

        if survey_data:
            survey_data = json.loads(survey_data)

        # Render the complete.html page with the previous survey responses
        return render_template('/complete.html', responses=survey_data)

    return render_template('/start_survey.html', survey=selected_survey)


@app.route('/initiate', methods=["POST"])
def initiate_session():
    """Clear the session of previous responses 
    and start the survey from the beginning."""

    # Clear the previous responses and set the current question number to 0
    session[RESPONSES_KEY] = [0] * session[SURVEY_Q_NUM_KEY]
    session[Q_NUM_KEY] = 0

    # Redirect to the first question
    return redirect('/questions/0')


@app.route('/questions/<int:q>')
def get_question(q):
    """Display the question at the given index."""

    # Get the selected survey from the session
    selected_survey = surveys[session[SURVEY_KEY]]

    # Get the responses from the session
    responses = session[RESPONSES_KEY]

    # Check if all questions have already been answered
    if responses.count(0) == 0:
        # Redirect to the completion page
        return redirect('/complete')

    # Check if the requested question index is valid
    if q < session[SURVEY_Q_NUM_KEY]:
        # Display the question at the given index
        question = selected_survey.questions[q]
        return render_template('/questions.html', question=question, q_num=q)

    # Check if the requested question index is out of range
    if q > session[SURVEY_Q_NUM_KEY]:
        # Display an error message and redirect to the current question
        q = session[Q_NUM_KEY]
        question = selected_survey.questions[q]
        flash('You are trying to access question in an invalid order')
        return render_template('/questions.html', question=question, q_num=q)

    # Check if user has reached to end of question list
    if q == session[Q_NUM_KEY]:
        # Get the index of the first unanswered question
        q = session['responses'].index(0)
        session[Q_NUM_KEY] = q
        question = selected_survey.questions[q]
        return render_template('/questions.html', question=question, q_num=q)


@app.route('/handle_submit')
def handle_submissions():

    if request.args.get('submit_button') == 'Continue':
        """Save response and redirect to next question."""
        # Extract the answer from the submitted form
        answer = {}

        selected_survey = surveys[session[SURVEY_KEY]]
        question = selected_survey.questions[session[Q_NUM_KEY]].question

        if question:
            answer["q_num"] = session[Q_NUM_KEY]
            answer["question"] = question

        choice = request.args.get("choice")
        if choice:
            answer["choice"] = choice
            session[f"choice_{session[Q_NUM_KEY]}"] = choice

        comment = request.args.get("comments")
        if comment:
            answer["comment"] = comment

        # Save the response to the session and update the question counter
        session[RESPONSES_KEY][session[Q_NUM_KEY]] = answer
        session[Q_NUM_KEY] += 1
        responses = session[RESPONSES_KEY]

        # Redirect to the next question or the completion page
        if session[Q_NUM_KEY] < session[SURVEY_Q_NUM_KEY]:
            return redirect(f'/questions/{session[Q_NUM_KEY]}')
        if responses.count(0) == 0:
            # They've answered all the questions! Thank them.
            return redirect('/complete')
        else:
            session[Q_NUM_KEY] = responses.index(0)
            return redirect(f'/questions/{session[Q_NUM_KEY]}')

    elif request.args.get('submit_button') == 'Back':
        """Redirect to the previous question."""
        if session[Q_NUM_KEY] != 0:
            session[Q_NUM_KEY] -= 1
            return redirect(f'/questions/{session[Q_NUM_KEY]}')
        else:
            return redirect('/start')

    elif request.args.get('submit_button') == 'Skip':
        """Skip the current question and redirect to the next question."""
        session[Q_NUM_KEY] += 1
        return redirect(f'/questions/{session[Q_NUM_KEY]}')


@app.route('/complete')
def complete():
    """Survey complete. Show completion page."""

    responses = (session[RESPONSES_KEY])
    print(responses)
    response = make_response(render_template(
        '/complete.html', responses=responses))
    response.set_cookie(session[SURVEY_KEY], value='true',
                        max_age=2628000)  # cookie expires after one month

    response.set_cookie('survey_data', json.dumps(
        responses), max_age=2628000)  # cookie expires after one month

    return response
