const LinkedList = require("./linked-list");

function pivotAround(llist, val) {
  const firstHalf = new LinkedList();
  const secondHalf = new LinkedList();
  let currentNode = llist.head;

  while (currentNode) {
    if (currentNode.val < val) {
      firstHalf.push(currentNode.val);
    } else {
      secondHalf.push(currentNode.val);
    }
    currentNode = currentNode.next;
  }

  firstHalf.tail.next = secondHalf.head;
  firstHalf.tail = secondHalf.tail;
  firstHalf.length += secondHalf.length;
  return firstHalf;
}

let llist = new LinkedList([7, 6, 2, 3, 9, 1, 1]);

console.log(pivotAround(llist, 5));
