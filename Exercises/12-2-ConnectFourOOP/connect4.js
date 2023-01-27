/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

class Player {
  constructor(playerName, color) {
    this.playerName = playerName;
    this.color = color;
  }
}

class Game {
  constructor() {
    this.WIDTH = 7;
    this.HEIGHT = 6;
    this.board = []; // array of rows, each row is array of cells  (board[y][x])
    this.currPlayer = P1; // active player: 1 or 2
  }

  /** makeBoard: create in-JS board structure:
   *   board = array of rows, each row is array of cells  (board[y][x])
   */

  makeBoard = () => {
    for (let y = 0; y < this.HEIGHT; y++) {
      this.board.push(Array.from({ length: this.WIDTH }));
    }
  };

  /** makeHtmlBoard: make HTML table and row of column tops. */

  makeHtmlBoard = () => {
    document.getElementById("game").classList.toggle("hide");
    const board = document.getElementById("board");

    // make column tops (clickable area for adding a piece to that column)
    const top = document.createElement("tr");
    top.setAttribute("id", "column-top");
    top.addEventListener("click", this.handleClick);

    for (let x = 0; x < this.WIDTH; x++) {
      const headCell = document.createElement("td");
      headCell.setAttribute("id", x);
      top.append(headCell);
    }

    board.append(top);

    // make main part of board
    for (let y = 0; y < this.HEIGHT; y++) {
      const row = document.createElement("tr");

      for (let x = 0; x < this.WIDTH; x++) {
        const cell = document.createElement("td");
        cell.setAttribute("id", `${y}-${x}`);
        row.append(cell);
      }

      board.append(row);
    }
  };

  /** findSpotForCol: given column x, return top empty y (null if filled) */

  findSpotForCol = (x) => {
    for (let y = this.HEIGHT - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  };

  /** placeInTable: update DOM to place piece into HTML table of board */

  placeInTable = (y, x) => {
    const piece = document.createElement("div");
    piece.classList.add("piece");
    piece.style.backgroundColor = this.currPlayer.color;
    piece.style.top = -50 * (y + 2);

    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  };

  /** endGame: announce game end */

  endGame(msg) {
    // endGameMessage = document.createElement("div");
    alert(msg);
  }

  /** handleClick: handle click of column top to play piece */
  handleClick = (evt) => {
    // get x from ID of clicked cell
    const x = +evt.target.id;

    // get next spot in column (if none, ignore click)
    const y = this.findSpotForCol(x);
    if (y === null) {
      return;
    }

    // place piece in board and add to HTML table
    this.board[y][x] = this.currPlayer;
    this.placeInTable(y, x);

    // check for win
    if (this.checkForWin()) {
      return this.endGame(`Player ${this.currPlayer.playerName} won!`);
    }

    // check for tie
    if (this.board.every((row) => row.every((cell) => cell))) {
      return this.endGame("Tie!");
    }

    // switch players
    this.currPlayer = this.currPlayer === P1 ? P2 : P1;
  };

  /** checkForWin: check board cell-by-cell for "does a win start here?" */

  checkForWin = () => {
    _win = _win.bind(this);
    function _win(cells) {
      // Check four cells to see if they're all color of current player
      //  - cells: list of four (y, x) cells
      //  - returns true if all are legal coordinates & all match currPlayer

      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.HEIGHT &&
          x >= 0 &&
          x < this.WIDTH &&
          this.board[y][x] === this.currPlayer
      );
    }

    for (let y = 0; y < this.HEIGHT; y++) {
      for (let x = 0; x < this.WIDTH; x++) {
        // get "check list" of 4 cells (starting here) for each of the different
        // ways to win
        const horiz = [
          [y, x],
          [y, x + 1],
          [y, x + 2],
          [y, x + 3],
        ];
        const vert = [
          [y, x],
          [y + 1, x],
          [y + 2, x],
          [y + 3, x],
        ];
        const diagDR = [
          [y, x],
          [y + 1, x + 1],
          [y + 2, x + 2],
          [y + 3, x + 3],
        ];
        const diagDL = [
          [y, x],
          [y + 1, x - 1],
          [y + 2, x - 2],
          [y + 3, x - 3],
        ];

        // find winner (only checking each win-possibility as needed)
        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          return true;
        }
      }
    }
  };
}

document.getElementById("game").classList.toggle("hide");
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const p1Color = document.getElementById("P1").value;
  const p2Color = document.getElementById("P2").value;

  P1 = new Player("P1", p1Color);
  P2 = new Player("P2", p2Color);

  // clear the board
  document.getElementById("board").innerHTML = "";
  document.getElementById("game").classList.toggle("hide");

  //Start the game
  document.getElementById("form").classList.toggle("hide");
  game = new Game(6, 7); // assuming constructor takes height, width
  game.makeBoard();
  game.makeHtmlBoard();
});
