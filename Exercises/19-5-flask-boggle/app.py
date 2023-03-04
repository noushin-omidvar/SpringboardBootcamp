from flask import Flask, request, session, render_template, jsonify
from boggle import Boggle
import time

app = Flask(__name__, template_folder="templates",
            static_folder='static', static_url_path='/static')

# Set the secret key for the Flask app
app.secret_key = 'BoGgLe_GaMe'


@app.route('/', methods=['GET', 'POST'])
def start_game():
    # Render the board size HTML template
    return render_template('index.html')


@app.route('/game', methods=['GET', 'POST'])
def display_board():
    global boggle_game
    # Handle the submission of a guess
    if request.method == 'POST':
        if request.content_type == 'application/json' and "guess" in request.get_json():

            # Get the guess from the request data and convert to lowercase
            guess = request.json.get('guess').lower()
            # Check if the guess is a valid word on the board
            result = boggle_game.check_valid_word(
                board=session['board'], word=guess)

            # Add to the score if the guess is a valid word on the board
            if result == 'ok':
                session['score'] += len(guess)

            # Return the result and current score as a JSON object
            return jsonify({'result': result, 'score': session['score']})

        # Create an instance of the Boggle game
        size = int(request.form.get('size'))
        session['grid_columns'] = f'repeat({size}, 1fr)'
        boggle_game = Boggle(size)
        board = boggle_game.make_board()
        session['board'] = board
        session['score'] = 0
    return render_template('board.html')
