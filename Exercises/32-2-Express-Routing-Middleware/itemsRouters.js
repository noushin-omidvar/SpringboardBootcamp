const express = require("express");
const router = new express.Router();
const expressError = require("./expressError");
const items = require("./fakeDb");

/* GET /items - this should render a list of shopping items.*/
router.get("/", (req, res, next) => {
  return res.json({ items: items });
});

/*
POST /items - this route should accept JSON data and add it to the shopping list.
Here is what a sample request/response looks like:

{“name”:”popsicle”, “price”: 1.45} => {“added”: {“name”: “popsicle”, “price”: 1.45}}
*/
router.post("/", (req, res, next) => {
  const newItem = req.body;
  // Add the new item to the shopping list
  items.push(newItem);

  // Respond with the added item
  return res.status(201).json({ added: newItem });
});

/*
GET /items/:name - this route should display a single item’s name and price.
*/
router.get("/:name", (req, res, send) => {
  const name = req.params.name;
  // Find the item by name in the shopping list
  const item = items.find((item) => item.name === name);

  if (item) {
    res.json({ name: item.name, price: item.price });
  } else {
    throw new expressError("Item not found", 404);
  }
});
/*
PATCH /items/:name, this route should modify a single item’s name and/or price.*/

router.patch("/:name", (req, res, send) => {
  const name = req.params.name;
  const newName = req.body.name;

  // Find the item by name in the items list
  const item = items.find((item) => item.name === name);

  if (item) {
    console.log(item);
    item.name = newName;
    console.log("patch", item);

    return res.json({ updated: item });
  } else {
    throw new expressError("Item not found", 404);
  }
});

/*
DELETE /items/:name - this route should allow you to delete a specific item from the array.

*/
router.delete("/:name", (req, res, next) => {
  const name = req.params.name;
  const itemIndex = items.findIndex((item) => item.name === name);

  if (itemIndex !== -1) {
    // Remove the item from the shopping list
    items.splice(itemIndex, 1);
    res.json({ message: "Deleted" });
  } else {
    throw new expressError("Item not found", 404);
  }
});

module.exports = router;
