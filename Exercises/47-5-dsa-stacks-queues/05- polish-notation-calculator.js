function calc(expression) {
  let stack = [];
  let tokens = expression.split(" ");
  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];
    if (token === "+" || token === "-" || token === "*" || token === "/") {
      let arg2 = stack.pop();
      let arg1 = stack.pop();
      if (token === "+") {
        stack.push(arg1 + arg2);
      } else if (token === "-") {
        stack.push(arg1 - arg2);
      } else if (token === "*") {
        stack.push(arg1 * arg2);
      } else {
        stack.push(arg1 / arg2);
      }
    } else {
      stack.push(parseInt(token));
    }
  }
  return stack.pop();
}

console.log(calc("+ 1 2")); // 3
console.log(calc("* 2 + 1 2")); // 6
console.log(calc("+ 9 * 2 3")); // 15
console.log(calc("- 1 2")); // -1
console.log(calc("- 9 * 2 3")); // 3
console.log(calc("/ 6 - 4 2")); // 3
