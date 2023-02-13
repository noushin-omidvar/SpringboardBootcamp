/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class CircularArray {
  constructor(head = null, tail = null) {
    this.head = head;
    this.tail = tail;
    this.length = 0;
  }

  addItem(val) {
    const newNode = new Node(val);
    newNode.next = this.head;

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
      this.length++;
    }
  }

  printArray() {
    let currentNode = this.head;
    let i = 0;
    while (i <= this.length) {
      console.log(currentNode.val);
      currentNode = currentNode.next;
      i++;
    }
  }

  getByIndex(idx) {
    if (idx >= this.length) {
      return null;
    }

    let i = 0;
    let currentNode = this.head;
    while (i < idx) {
      i++;
      currentNode = currentNode.next;
    }
    console.log(currentNode.val);
  }

  rotate(rotation) {
    let i = 0;
    let currentHead = this.head;
    let currentTail = this.tail;

    if (rotation > 0) {
      while (i < rotation) {
        currentTail = currentHead;
        currentHead = currentHead.next;
        i++;
      }
    } else {
      while (i < Math.abs(rotation)) {
        currentHead = currentTail;
        currentTail = currentTail.prev;
        i++;
      }
    }
    this.head = currentHead;
    this.tail = currentTail;
  }
}

module.exports = CircularArray;
