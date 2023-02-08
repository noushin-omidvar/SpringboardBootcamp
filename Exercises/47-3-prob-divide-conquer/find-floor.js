function findFloor(arr, val) {
  /**
   * Given a sorted array and a value x returns the floor of x in the array.
   * The floor of x in an array is the largest element in the array which is
   * smaller than or equal to x. If the floor does not exist, return -1.
   */
  let start = 0;
  let end = arr.length - 1;
  let mid;

  while (start <= end) {
    mid = Math.floor((start + end) / 2);

    if (arr[mid] < val) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  mid = Math.floor((start + end) / 2);
  if (arr[mid] <= val) {
    return arr[mid];
  }

  return -1;
}

module.exports = findFloor;
