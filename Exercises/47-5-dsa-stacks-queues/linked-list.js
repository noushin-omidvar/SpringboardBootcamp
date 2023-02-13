/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length++;
  }

  /** pop(): return & remove last item. */

  pop() {
    const lastItem = this.tail;
    let currentNode = this.head;

    for (let i = 0; i < this.length - 2; i++) {
      currentNode = currentNode.next;
    }

    currentNode.next = null;
    this.tail = currentNode;
    this.length--;

    if (this.length == 0) {
      this.head = null;
      this.tail = null;
    }
    return lastItem.val;
  }

  /** shift(): return & remove first item. */

  shift() {
    const firstItem = this.head;
    this.head = this.head.next;
    this.length--;
    if (this.length == 0) {
      this.head = null;
      this.tail = null;
    }
    return firstItem.val;
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if (idx > this.length - 1) {
      throw new Error("Index is out of range");
    }
    let currentNode = this.head;
    let i = 0;
    while (i < idx) {
      i++;
      currentNode = currentNode.next;
    }
    return currentNode.val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (idx > this.length - 1) {
      throw new Error("Index is out of range");
    }
    let currentNode = this.head;
    let i = 0;
    while (i < idx) {
      i++;
      currentNode = currentNode.next;
    }
    currentNode.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx > this.length) {
      throw new Error("Index is out of range");
    }

    if (idx === this.length) {
      this.push(val);
      return;
    }
    if (idx === 0) {
      this.unshift(val);
      return;
    }

    let previousNode = this.head;
    let i = 0;
    while (i < idx - 1) {
      i++;
      previousNode = previousNode.next;
    }
    const newNode = new Node(val);

    newNode.next = previousNode.next;
    previousNode.next = newNode;
    this.length++;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (idx > this.length) {
      throw new Error("Index is out of range");
    }

    // special case : remove last item
    if (idx === this.length - 1) {
      this.pop();
      return;
    }

    // special case : remove first item
    if (idx === 0) {
      this.shift();
      return;
    }

    let prevNode = this.head;
    let i = 0;
    while (i < idx - 1) {
      i++;
      prevNode = prevNode.next;
    }
    const val = prevNode.next;
    prevNode.next = prevNode.next.next;
    this.length--;
    return val;
  }

  /** average(): return an average of all values in the list */

  average() {
    if (this.length === 0) return 0;
    let sum = 0;
    let currentNode = this.head;
    while (currentNode) {
      sum += currentNode.val;
      currentNode = currentNode.next;
    }

    return sum / this.length;
  }
}

module.exports = LinkedList;
