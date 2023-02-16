/**
 *
 * @param {Array} list - The split square list to be dumped
 * @param {Number} idx - The current index of list to be looked at
 * @returns {string} dumped - The string of dumped split square
 */

function dump(list, idx = 0, dumped = "") {
  if (!Array.isArray(list)) {
    return list;
  }

  if (idx === list.length) {
    return dumped;
  }
  if (Array.isArray(list[idx])) {
    return dump(list[idx], (idx = 0), dumped);
  }

  if ([1, 0].includes(list[idx])) {
    dumped += list[idx] + " ";
  }

  return dump(list, idx + 1, dumped);
}
