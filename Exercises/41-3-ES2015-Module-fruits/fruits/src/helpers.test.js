import { choice, remove } from "./helpers";

describe("Array helper functions", () => {
  test("choice function should return a valid item from an array", () => {
    const items = ["a", "b", "c", "d", "e"];
    const selectedItem = choice(items);
    expect(items).toContain(selectedItem);
  });

  test("remove function should remove the specified item from an array", () => {
    const items = ["a", "b", "c", "d", "e"];
    const removedItem = "c";
    const remainingItems = remove(items, removedItem);
    expect(remainingItems).not.toContain(removedItem);
  });

  test("remove function should return undefined if the item does not exist", () => {
    const items = ["a", "b", "c", "d", "e"];
    const nonExistentItem = "z";
    const result = remove(items, nonExistentItem);
    expect(result).toBeUndefined();
  });
});
