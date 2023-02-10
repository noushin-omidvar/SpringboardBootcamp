const LinkedList = require("./linked-list");

function sortSortedLinkedList(a, b) {
  /**
   * Giventwo linked lists,  a  and  b, both of which are already
   * sorted returns a  _new_  linked list, in sorted order.
   * - a: sorted linked list
   * - b: sorted linked list
   */

  i = 0;
  j = 0;
  newList = new LinkedList();
  aNode = a.head;
  bNode = b.head;
  while (aNode && bNode) {
    if (aNode.val < bNode.val) {
      newList.push(aNode.val);
      aNode = aNode.next;
    } else {
      newList.push(bNode.val);
      bNode = bNode.next;
    }
  }
  if (aNode) newList.push(aNode.val);
  else newList.push(bNode.val);
  return newList;
}

module.exports = { sortSortedLinkedList };
