function findRotationCount(arr) {
  /**
   * Given an array of distinct numbers sorted in increasing order that
   * has been rotated counter-clockwise n number of times.
   * return the value of n.
   * - array
   */

  let end = arr.length - 1;
  let start = 0;
  let mid_idx = Math.floor((start + end) / 2);

  while (start <= end) {
    if (arr.length === 1 || arr[0] < arr[arr.length - 1]) return 0;

    if (arr[mid_idx] > arr[mid_idx + 1]) {
      return mid_idx + 1;
    } else if (arr[start] <= arr[mid_idx]) {
      start = mid_idx + 1;
    } else {
      end = mid_idx - 1;
    }
    mid_idx = Math.floor((start + end) / 2);
  }

  let rotationCount = mid_idx;

  return rotationCount;
}

module.exports = findRotationCount;
