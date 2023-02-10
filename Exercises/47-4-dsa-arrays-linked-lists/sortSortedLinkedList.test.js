const LinkedList = require("./linked-list");
const DoublyLinkedList = require("./doubly-linked-list");
const { sortSortedLinkedList } = require("./sortSortedLinkedList.js");

describe("sort list", function () {
  it("returns a sorted list from two other sorted list ", function () {
    const a = new LinkedList([1, 3, 6, 9, 12, 45, 78, 100]);
    const b = new LinkedList([1, 8, 16, 18, 40, 68, 110]);
    const sorted = new LinkedList([
      1, 1, 3, 6, 8, 9, 12, 16, 18, 40, 45, 68, 78, 100, 110,
    ]);
    expect(sortSortedLinkedList(a, b).length).toEqual(15);
    expect(sortSortedLinkedList(a, b)).toEqual(sorted);
  });
});
