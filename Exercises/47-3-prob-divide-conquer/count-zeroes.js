function countZeroes(arr) {
  /** Given an array of 1s and 0s which has all 1s first followed by all 0s,
   *  returns the number of zeroes in the array.
   * - arr
   * */

  let right_idx = arr.length - 1;
  let left_idx = 0;
  let mid_idx;
  let mid_val;

  while (right_idx >= left_idx) {
    mid_idx = Math.floor((right_idx + left_idx) / 2);
    mid_val = arr[mid_idx];

    if (mid_val === 0) {
      right_idx = mid_idx - 1;
    } else if (mid_val === 1) {
      left_idx = mid_idx + 1;
    }
  }

  return arr.length - right_idx - 1;
}

module.exports = countZeroes;
