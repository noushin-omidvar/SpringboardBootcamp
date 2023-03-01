from flask import Flask, request, session, render_template, jsonify
from boggle import Boggle

app = Flask(__name__, template_folder="templates",
            static_folder='static', static_url_path='/static')
app.secret_key = 'BoGgLe_GaMe'

boggle_game = Boggle()


@app.route('/', methods=['GET', 'POST'])
def display_board():

    if request.method == 'POST':
        guess = request.get_json()['guess'].lower()
        print(guess)
        print(boggle_game.check_valid_word(board=session['board'], word=guess))
        return jsonify({'result': boggle_game.check_valid_word(board=session['board'], word=guess)})
    board = boggle_game.make_board()
    session['board'] = board
    print(board)
    return render_template('board.html')
