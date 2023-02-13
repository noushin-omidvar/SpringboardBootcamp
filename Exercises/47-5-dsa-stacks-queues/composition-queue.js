const LinkedList = require("./linked-list");

class Queue {
  constructor() {
    this.size = 0;
    this.first = null;
    this.last = null;
    this._list = new LinkedList();
  }

  /** enqueue(val): add new value to end of the queue. Returns undefined. */

  enqueue(val) {
    this._list.push(val);
    this.first = this._list.head;
    this.last = this._list.tail;
    this.size = this._list.length;
  }

  /** dequeue(): remove the node from the start of the queue
   * and return its value. Should throw an error if the queue is empty. */

  dequeue() {
    if (this.isEmpty()) throw Error;
    const first_val = this._list.shift();
    this.first = this._list.head;
    this.head = this._list.tail;
    this.size = this._list.length;
    return first_val;
  }

  /** peek(): return the value of the first node in the queue. */

  peek() {
    return this._list.head.val;
  }

  /** isEmpty(): return true if the queue is empty, otherwise false */

  isEmpty() {
    return this.size === 0 ? true : false;
  }
}

module.exports = Queue;
