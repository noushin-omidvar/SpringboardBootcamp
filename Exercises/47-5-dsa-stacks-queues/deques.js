const DoublyLinkedList = require("./doubly-linked-list");

class Dequeue {
  constructor() {
    this.size = 0;
    this.first = null;
    this.last = null;
    this._list = new DoublyLinkedList();
  }

  /** appendleft(val): add new value to beginning of the dequeue. Returns undefined. */

  appendleft(val) {
    this._list.unshift(val);
    this.first = this._list.head;
    this.last = this._list.tail;
    this.size = this._list.length;
  }

  /** appendright(val): add new value to end of the dequeue. Returns undefined. */

  appendright(val) {
    this._list.push(val);
    this.first = this._list.head;
    this.last = this._list.tail;
    this.size = this._list.length;
  }

  /** popleft(): remove the node from the start of the dequeue
   * and return its value. Should throw an error if the queue is empty. */

  popleft() {
    if (this.isEmpty()) throw Error;
    const first_val = this._list.shift();
    this.first = this._list.head;
    this.head = this._list.tail;
    this.size = this._list.length;
    return first_val;
  }

  /** popright(): remove the node from the end of the dequeue
   * and return its value. Should throw an error if the dequeue is empty. */

  popright() {
    if (this.isEmpty()) throw Error;
    const first_val = this._list.pop();
    this.first = this._list.head;
    this.head = this._list.tail;
    this.size = this._list.length;
    return first_val;
  }

  /** peekleft(): return the value of the beginning node in the dequeue. */

  peekleft() {
    return this._list.head.val;
  }

  /** peekright(): return the value of the end node in the dequeue. */
  peekright() {
    return this._list.tail.val;
  }

  /** isEmpty(): return true if the queue is empty, otherwise false */

  isEmpty() {
    return this.size === 0 ? true : false;
  }
}

module.exports = Dequeue;
