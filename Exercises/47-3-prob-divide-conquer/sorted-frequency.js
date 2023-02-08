function sortedFrequency(arr, num) {
  /**  Given a sorted array and a number counts
   * the occurrences of the number in the array
   * - arr: sorted array
   * - num
   */

  let lower_idx = 0;
  let upper_idx = arr.length;
  let mid_idx = Math.floor((lower_idx + upper_idx) / 2);

  while (lower_idx <= mid_idx) {
    if (arr[mid_idx] < num) {
      lower_idx = mid_idx + 1;
    } else {
      upper_idx = mid_idx - 1;
    }
    mid_idx = Math.floor((lower_idx + upper_idx) / 2);
  }

  const low = lower_idx;

  lower_idx = 0;
  upper_idx = arr.length - 1;
  mid_idx = Math.floor((lower_idx + upper_idx) / 2);

  while (upper_idx >= mid_idx) {
    if (arr[mid_idx] <= num) {
      lower_idx = mid_idx + 1;
    } else {
      upper_idx = mid_idx - 1;
    }
    mid_idx = Math.ceil((lower_idx + upper_idx) / 2);
  }

  const up = upper_idx;
  if (low > up) return -1;

  return up - low + 1;
}

module.exports = sortedFrequency;
