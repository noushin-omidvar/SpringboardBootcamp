from flask import Flask, request
from operations import *
app = Flask(__name__)


@app.route('/add')
def ADD():
    "Add a and b "
    a = request.args.get("a", default=None, type=float)
    b = request.args.get("b", default=None, type=float)
    return str(add(a, b))


@app.route('/sub')
def SUB():
    """Substract b from a."""
    a = request.args.get("a", default=None, type=float)
    b = request.args.get("b", default=None, type=float)
    return str(sub(a, b))


@app.route('/mult')
def MULT():
    """Multiply a and b."""
    a = request.args.get("a", default=None, type=float)
    b = request.args.get("b", default=None, type=float)
    return str(mult(a, b))


@app.route('/div')
def DIV():
    """Divide a by b."""
    a = request.args.get("a", default=None, type=float)
    b = request.args.get("b", default=None, type=float)
    return str(div(a, b))


OPERATORS = {
    'add': add,
    'sub': sub,
    'mult': mult,
    'div': div
}


@app.route('/math/<operation>')
def MATH(operation):
    f"""{operation} a by b."""
    print(operation)
    a = request.args.get("a", default=None, type=float)
    b = request.args.get("b", default=None, type=float)
    return str(OPERATORS[operation](a, b))
