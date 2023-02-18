/**
 *
 * @param {Array} s - The split square list to be dumped
 * @returns - The string of dumped split square
 */

function dump(s) {
  // Base case : is already just an integer
  if (s === 0 || s === 1) {
    return s.toString();
  } else {
    return s.map(dump).join(" ");
  }
}

/**
 *  Given a square/split square (nested list of numbers) returns true if it is valid, and false if it is not.
 * @param {Array} square - The square to validate
 * @returns Boolean
 */
function validate(square) {
  // Base case: if the input is already just an integer, return true
  if (square === 0 || square === 1) {
    return true;
  }

  // Recursive case: if the input is a nested list of length 4, check that each element is valid
  if (Array.isArray(square) && square.length === 4) {
    return square.every(is_valid);
  }

  // If the input is not valid, return false
  return false;
}

/**
Given a square/split square (nested list of numbers) returns the maximally-simplified version of it.
@param {Array} square - The square to simplify
@returns {Number|Array} - The maximally-simplified square, either a number or a nested list of numbers.
*/
function simplify(square) {
  // Base case: if the square is already just an integer, return it
  if (square === 0 || square === 1) {
    return square;
  }
  // Recursive case: simplify the nested lists in the square and replace them in the original square
  square = square.map(simplify(square));

  // If all the values in the square are equal, return the first value
  if (Number.isInteger(square[0]) && square.every((val) => val === square[0]))
    return square[0];

  // If the square is not completely simplified, return the simplified version of it
  return square;
}

/**
Given two squares or split squares, returns their element-wise sum.
@param {Array|Number} s1 - The first square to be added
@param {Array|Number} s2 - The second square to be added
@param {Number} idx - The current index of the square to be looked at
@param {Array} sum - The sum of squares being built recursively
@returns {Array|Number} - The element-wise sum of the two squares
*/
function add(s1, s2, idx = 0, sum = []) {
  // base cases: if either square is 1, returns 1. If both are 0, returns 0.
  if (s1 === 1 || s2 === 1) return 1;
  else if ((s1 === 0) & (s2 === 0)) return 0;

  // if one square is a split square and the other is a number, turn the number into a split square.
  if (Array.isArray(s1) && !Array.isArray(s2)) {
    s2 = [s2, s2, s2, s2];
  }
  if (Array.isArray(s2) && !Array.isArray(s1)) {
    s1 = [s1, s1, s1, s1];
  }

  // recursively add each corresponding element of the two squares
  return [
    add(s1[0], s2[0]),
    add(s1[1], s2[1]),
    add(s1[2], s2[2]),
    add(s1[3], s2[3]),
  ];
}
