/**
 *
 * @param {Array} list - The split square list to be dumped
 * @param {Number} idx - The current index of list to be looked at
 * @returns {string} dumped - The string of dumped split square
 */

function dump(list, idx = 0, dumped = "") {
  // Base case :
  if (idx === list.length) {
    return dumped.trim();
  }

  // If the input is just 0 or 1 return it as dumped
  if ([0, 1].includes(list)) {
    return list;
  }

  // If the current element is a nested list call the function on it
  if (Array.isArray(list[idx])) {
    return dump(list[idx], 0, dumped);
  }

  // If the current element is 0 or 1 dump it
  if ([1, 0].includes(list[idx])) {
    dumped += list[idx] + " ";
  }

  // Recursive case: call the function with the next index
  return dump(list, idx + 1, dumped);
}

/**
 *  Given a square/split square (nested list of numbers) returns true if it is valid, and false if it is not.
 * @param {Array} square - The square to validate
 * @param {Number} idx - The index at which to look
 * @param {Boolean} - Whether the given square is a valid split square or not
 * @returns isValid
 */

function validate(square, idx = 0) {
  //Base Case : if we've reached the end of the list, return true.
  if (idx === square.length) {
    return true;
  }

  // If the list size is not 4 return false
  if (square === 0 || square === 1) {
    return true;
  }

  // If the list size is not 4 return false
  if (square.length !== 4) {
    return false;
  }

  // If the current element is a  list rather than a number (supposably splited square) call the function on the nested list
  if (Array.isArray(square[idx])) {
    return validate(square[idx], 0);
  }

  // If the current element is not 0 and 1 return false
  if (![0, 1].includes(square[idx])) {
    return false;
  }

  // Recursive case: call the function with the next index
  return validate(square, idx + 1);
}

/**
 *  Given a square returns the maximally-simplified version of it.
 * @param {*} square
 * @param {*} idx
 * @param {*} hasSplit
 * @returns
 */

function simplify(square, idx = 0, hasSplit = false) {
  // Base case : if we've reached the end of the list, return the square.
  if (idx === square.length) {
    if (!hasSplit) {
      square = square[0];
    }
    return square;
  }

  // If the current element is a  list rather than a number (supposably splited square) call the function on the nested list
  if (Array.isArray(square[idx])) {
    square[idx] = simplify(square[idx], 0, false);
  }

  let squareFill = square[0];
  // If the current element is not the same as first element set has split as true
  if (square[idx] !== squareFill) {
    hasSplit = true;
  }

  // Recursive case: call the function with the next index
  return simplify(square, idx + 1, hasSplit);
}

function add(s1, s2) {}
