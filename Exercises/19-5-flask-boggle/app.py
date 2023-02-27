from flask import Flask, request, session, render_template
from boggle import Boggle

app = Flask(__name__)
app.secret_key = 'BoGgLe_GaMe'

boggle_game = Boggle()


@app.route('/')
def display_board():
    board = boggle_game.make_board()
    session['board'] = board
    return render_template('board.html')
