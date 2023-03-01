from flask import Flask, request, session, render_template, jsonify
from boggle import Boggle

app = Flask(__name__, template_folder="templates",
            static_folder='static', static_url_path='/static')

# Set the secret key for the Flask app
app.secret_key = 'BoGgLe_GaMe'

# Create an instance of the Boggle game
boggle_game = Boggle()

# Route to display the game board and handle user guesses


@app.route('/', methods=['GET', 'POST'])
def display_board():

    # Handle the submission of a guess
    if request.method == 'POST':
        # Get the guess from the request data and convert to lowercase
        guess = request.get_json()['guess'].lower()

        # Check if the guess is a valid word on the board
        result = boggle_game.check_valid_word(
            board=session['board'], word=guess)

        # Add to the score if the guess is a valid word on the board
        if result == 'ok':
            session['score'] += len(guess)

        # Return the result and current score as a JSON object
        return jsonify({'result': result, 'score': session['score']})

    # If it's a GET request, initiate the board and score
    board = boggle_game.make_board()
    session['board'] = board
    session['score'] = 0

    # Render the game board HTML template
    return render_template('board.html')
