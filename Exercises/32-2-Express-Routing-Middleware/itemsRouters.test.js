process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("./app");
// let items = require("./fakeDb");

let iceCreame = { name: "Ice Cream", price: 5.45 };

beforeEach(function () {
  items.push(iceCreame);
});

afterEach(function () {
  items.length = 0;
});

/** GET /items - returns `{items: [ ...]}` */

describe("GET /items", function () {
  test("Gets a list of items", async function () {
    const resp = await request(app).get(`/items`);
    expect(resp.statusCode).toBe(200);

    expect(resp.body).toEqual({ items: [iceCreame] });
  });
});

describe("POST /items", function () {
  test("add an item to the database", async function () {
    const newItem = { name: "Popcicle", price: 2.35 };
    const resp = await request(app).post("/items").send(newItem);
    expect(resp.statusCode).toBe(201);
    console.log(resp.body);
    expect(resp.body).toEqual({ added: newItem });
  });
});

describe("PATCH /items/:name", function () {
  test("Update an item", async function () {
    const resp = await request(app).patch(`/items/${iceCreame.name}`).send({
      name: "chips",
    });
    expect(resp.statusCode).toBe(200);
    console.log(resp.body);
    expect(resp.body).toEqual({ updated: { name: "chips", price: 5.45 } });
  });

  test("Responds with 404 if id invalid", async function () {
    const resp = await request(app).patch(`/items/0`);
    expect(resp.statusCode).toBe(404);
  });
});

describe("DELETE /itemss/:name", function () {
  test("Deletes a single a cat", async function () {
    const resp = await request(app).delete(`/items/${iceCreame.name}`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ message: "Deleted" });
  });
});
