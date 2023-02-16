/**
 * The Balanced Brackets challenge using recursion
 * @param {string} str - The string to check for balanced brackets.
 * @param {number} idx - The current index of the string being checked.
 * @param {number} opened - The number of opening brackets encountered so far.
 * @return {boolean} - Returns true if the brackets are balanced, false otherwise.
 */
function isBalanced(str, idx = 0, opened = 0) {
  // Base case: if we've reached the end of the string, return true if all brackets are balanced.
  if (idx === str.length) {
    return opened === 0;
  }

  if (str[0] === "(" || str.length % 2 === 1) return false;

  // If we encounter an opening bracket, increment the count of opened brackets.
  if (str[idx] === "(") {
    opened++;
  }

  // If we encounter a closing bracket, decrement the count of opened brackets.
  if (str[idx] === ")") {
    opened--;
  }

  // Recursive case: call the function with the next index and updated bracket count.
  return isBalanced(str, idx + 1, opened);
}

console.log(isBalanced(")("));
console.log(isBalanced("()()()"));
console.log(isBalanced("("));
