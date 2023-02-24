from flask import Flask, render_template, request, redirect, flash, session, make_response
from flask_debugtoolbar import DebugToolbarExtension
from surveys import surveys
import json

RESPONSES_KEY = "responses"
Q_NUM_KEY = "q_num"
SURVEY_KEY = 'survey'
SURVEY_Q_NUM_KEY = 'NUM_QS'
app = Flask(__name__)
app.config['SECRET_KEY'] = "oh-so-secret"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)


@app.route('/')
def select_survey():
    """Select survey"""
    return render_template('select_survey.html', surveys=surveys)


@app.route('/start', methods=['get'])
def show_survey_start():
    """ Show survey start """
    session[SURVEY_KEY] = request.args.get('survey')
    survey = surveys[session[SURVEY_KEY]]
    session[SURVEY_Q_NUM_KEY] = len(survey.questions)

    if request.cookies.get(session[SURVEY_KEY]):
        flash(f"You have already completed {session[SURVEY_KEY]} survey.")
        survey_data = request.cookies.get('survey_data')
        if survey_data:
            survey_data = json.loads(survey_data)
        print(survey_data)
        return render_template('/complete.html', responses=survey_data)

    return render_template('/start_survey.html', survey=survey)


@app.route('/initiate', methods=["POST"])
def initiate_session():
    """Clear the session of responses."""
    session[RESPONSES_KEY] = []
    session[Q_NUM_KEY] = 0
    return redirect('/questions/0')


@app.route('/questions/<int:q>')
def get_question(q):
    survey = surveys[session[SURVEY_KEY]]
    if q != session[Q_NUM_KEY]:
        # Trying to access questions out of order.
        q = session[Q_NUM_KEY]
        flash('You are trying to access an invalid question')

    if q < session[SURVEY_Q_NUM_KEY]:
        question = survey.questions[q]
        return render_template('/questions.html', question=question, q_num=q)
    else:
        # They've answered all the questions! Thank them.
        return redirect('/complete')


@app.route('/answer', methods=['GET', 'POST'])
def get_response():
    """Save response and redirect to next question."""
    # get the responses
    answer = {}

    survey = surveys[session[SURVEY_KEY]]
    question = survey.questions[session[Q_NUM_KEY]].question
    if question:
        answer["question"] = question

    choice = request.args.get("choice")
    if choice:
        answer["choice"] = choice

    comment = request.args.get("comments")
    if comment:
        answer["comment"] = comment

    # add the response to the session
    responses = session[RESPONSES_KEY]
    responses.append(answer)
    session[RESPONSES_KEY] = responses
    session[Q_NUM_KEY] += 1

    if session[Q_NUM_KEY] < session[SURVEY_Q_NUM_KEY]:
        return redirect(f'/questions/{session[Q_NUM_KEY]}')
    else:
        # They've answered all the questions! Thank them.
        return redirect('/complete')


@app.route('/complete')
def complete():
    """Survey complete. Show completion page."""

    responses = (session[RESPONSES_KEY])
    response = make_response(render_template(
        '/complete.html', responses=responses))
    response.set_cookie(session[SURVEY_KEY], value='true',
                        max_age=2628000)  # cookie expires after one month

    response.set_cookie('survey_data', json.dumps(
        responses), max_age=2628000)  # cookie expires after one month

    return response
