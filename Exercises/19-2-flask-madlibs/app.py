import re

from stories import *
from flask import Flask, render_template, request, session
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SECRET_KEY'] = "oh-so-secret"

# debug = DebugToolbarExtension(app)


@app.route('/', methods=['GET', 'POST'])
def choose_story():
    return render_template('index.html')


STORIES = {
    'story1': """Once upon a time in a long-ago {place}, there lived a
       large {adjective} {noun}. It loved to {verb} {plural_noun}.""",

    'story2': """Once upon a time in a long-ago {place}, there lived a
       large {adjective} {noun}. It loved to {verb} {plural_noun}.""",

    'story3': """Once upon a time in a long-ago {place}, there lived a
       large {adjective} {noun}. It loved to {verb} {plural_noun}.""",

    'story4': """Once upon a time in a long-ago {place}, there lived a
large {adjective} {noun}. It loved to {verb} {plural_noun}."""

}


@app.route('/form')
def show_form():
    storyID = request.args.get('stories')
    story_outline = STORIES[storyID]
    session["story_outline"] = story_outline
    words = re.findall('\{([^}]+)', story_outline)
    return render_template('form.html', words=words)


@app.route('/story')
def make_story():
    answers = request.args.to_dict()
    words = answers.keys()
    story_outline = session["story_outline"]
    story = Story(
        words,
        story_outline
    )
    return render_template('story.html', story=story.generate(answers))
