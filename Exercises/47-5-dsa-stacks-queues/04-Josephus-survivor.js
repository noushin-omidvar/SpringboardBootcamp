const CircularArray = require("./circular-array");

/**
 * Given a number of people and the "skip" value, calculates which person will survive.
 *
 * @param {number} num - The number of people
 * @param {number} skip - The "skip" value
 * @returns {number} The survivor's number
 */

function survivor(num, skip) {
  // Declare a CircularArray object to represent the linked list
  const circ = new CircularArray();

  // Populate the linked list with `num` items
  for (let val of Array.from({ length: num }, (_, i) => i + 1))
    circ.addItem(val);

  // Keep track of the current node while looping through the linked list
  curNode = circ.tail;

  // Continue looping until there is only one person left
  while (circ.length !== 1) {
    // Move `curNode` ahead by `skip - 1` nodes
    for (let i = 0; i < skip - 1; i++) {
      curNode = curNode.next;
    }

    // Update the head or tail of the linked list if necessary
    if (curNode.next === circ.head) circ.head = curNode.next.next;
    if (curNode.next === circ.tail) circ.tail = curNode;

    // Remove the node `curNode.next` from the linked list (kill people)
    curNode.next = curNode.next.next;
    curNode.next.next.prev = curNode;
    circ.length--;
  }

  // Return the value of the survivor
  return circ.head.val;
}

survivor(10, 3);
