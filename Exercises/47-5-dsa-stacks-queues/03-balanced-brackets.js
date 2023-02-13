const Stack = require("./stack");

function balancedBrackets(str) {
  parans = { "(": ")", "[": "]", "{": "}" };
  opens = Object.keys(parans);
  closes = Object.values(parans);
  // declare stacks for different types of brackets
  let openStack = new Stack();

  //
  for (let c of str) {
    if (opens.includes(c)) {
      openStack.push(c);
    }

    if (closes.includes(c)) {
      if (c === parans[openStack.first.val]) {
        openStack.pop();
      } else return false;
    }
  }
  return !openStack.isEmpty() ? false : true;
}
