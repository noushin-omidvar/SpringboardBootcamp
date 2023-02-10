const DoublyLinkedList = require("./doubly-linked-list");

function reverseInPlace(llist) {
  /**
   * It reverses a linked list in place — not by creating a new list or new nodes.
   * - llist : Doubly linked list class
   */
  currentNode = llist.head;
  for (let i = 0; i < llist.length; i++) {
    const temp = currentNode.next;
    [currentNode.next, currentNode.previous] = [
      currentNode.previous,
      currentNode.next,
    ];
    currentNode = temp;
  }
  [llist.head, llist.tail] = [llist.tail, llist.head];

  return llist;
}

module.exports = reverseInPlace;
