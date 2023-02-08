function findRotatedIndex(arr, val) {
  /**
   *  Given a rotated array of sorted numbers and an integer
   *  it returns the index of num in the array.
   *  If the value is not found, return -1.
   */
  const pivot = findPivot(arr);
  if (val > arr[pivot - 1] || val < arr[pivot]) return -1;
  else if (arr[arr.length - 1] < val) {
    return binarySearch(arr, val, 0, pivot - 1);
  } else {
    return binarySearch(arr, val, pivot, arr.length - 1);
  }
}

function binarySearch(arr, val, start, end) {
  /**
   * Given an array of sorted numbers and an integer
   *  it returns the index of num in the array.
   *  If the value is not found, return -1.
   */

  let mid;
  while (start <= end) {
    mid = Math.floor((start + end) / 2);

    if (arr[mid] === val) {
      return mid;
    }
    if (arr[mid] < val) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return -1;
}

function findPivot(arr) {
  /**
   * Given a rotated array return the pivot place index
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

  let pivot = mid_idx;

  return pivot;
}

module.exports = findRotatedIndex;
