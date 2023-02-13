const Stack = require("./stack");

function stringReverse(str) {
  /** reverses a string by handling one letter at a time */

  let stringStack = new Stack();
  str = str.toLowerCase();
  const n = str.length;
  // push string characters into stack
  for (let i = 0; i < n; i++) {
    stringStack.push(str[i]);
  }
  // pop the character from stack append it
  let reversedStr = "";

  while (!stringStack.isEmpty()) {
    reversedStr += stringStack.peek();
    stringStack.pop();
  }

  return reversedStr;
}
