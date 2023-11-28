/**
 * Chooses a random item from an array.
 * @param {Array} items - The array from which to choose.
 * @returns {*} - The randomly selected item.
 */
export function choice(items) {
  return items[Math.floor(Math.random() * items.length)];
}

/**
 * Removes the first matching item from an array, if exists.
 * @param {Array} items - The array to remove the item from.
 * @param {*} item - The item to remove.
 * @returns {*} - The removed item or undefined if not found.
 */
export function remove(items, item) {
  const index = items.indexOf(item);
  if (index !== -1) {
    return items.splice(index, 1)[0];
  }
  return undefined;
}
