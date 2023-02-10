/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.previous = null;
  }
}

/** LinkedList: chained together nodes. */

class DoublyLinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** _get(idx): retrieve node at idx. */

  _get(idx) {
    let cur = this.head;
    let count = 0;

    while (cur !== null && count != idx) {
      count += 1;
      cur = cur.next;
    }

    return cur;
  }

  /** push(val): add new value to end of list. */

  push(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.previous = this.tail;
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
      this.head.previous = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length++;
  }

  /** pop(): return & remove last item. */

  pop() {
    const lastItem = this.tail;

    if (this.length == 1 || this.length == 0) {
      this.head = null;
      this.tail = null;
      this.length = 0;
      return lastItem.val;
    }

    this.tail = this.tail.previous;
    this.tail.next = null;
    this.length--;

    return lastItem.val;
  }

  /** shift(): return & remove first item. */

  shift() {
    const firstItem = this.head;

    if (this.length == 1 || this.length == 0) {
      this.head = null;
      this.tail = null;
      this.length = 0;
      return firstItem.val;
    }

    this.head = this.head.next;
    this.head.previous = null;
    this.length--;
    return firstItem.val;
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if (idx > this.length - 1) {
      throw new Error("Index is out of range");
    }
    let currentNode = this._get(idx);
    return currentNode.val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (idx > this.length - 1) {
      throw new Error("Index is out of range");
    }
    let currentNode = this._get(idx);
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

    let prevNode = this._get(idx - 1);
    const newNode = new Node(val);
    newNode.next = prevNode.next;
    newNode.previous = prevNode;
    prevNode.next = newNode;
    prevNode.next.previous = newNode;
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

    let currentNode = this._get(idx);
    const val = currentNode.val;
    currentNode.previous.next = currentNode.next;
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

module.exports = DoublyLinkedList;
