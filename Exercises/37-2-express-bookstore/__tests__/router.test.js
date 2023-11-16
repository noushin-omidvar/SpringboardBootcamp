const request = require("supertest");
const app = require("../app");
const db = require("../db");

beforeEach(async () => {
  await db.query("DELETE FROM books");

  let book = await db.query(
    `INSERT INTO books (isbn, amazon_url, author, language, pages, publisher, title, year)  
     VALUES('0691161518', 'http://a.co/eobPtX2', 'Matthew Lane', 'english', 264, 'Princeton University Press', 'Power-Up: Unlocking the Hidden Mathematics in Video Games', 2017) 
     RETURNING *`
  );
});

describe("GET /books", () => {
  test("Gets a list of books", async () => {
    const res = await request(app).get("/books");
    expect(res.statusCode).toBe(200);
    expect(res.body.books).toHaveLength(1);
  });
});

describe("GET /books/:id", () => {
  test("Gets a single book", async () => {
    const res = await request(app).get("/books/0691161518");
    expect(res.statusCode).toBe(200);
    expect(res.body.book.isbn).toBe("0691161518");
  });

  test("Responds with 404 if not found", async () => {
    const res = await request(app).get("/books/999");
    expect(res.statusCode).toBe(404);
  });
});

describe("POST /books", () => {
  test("Creates a new book", async () => {
    const res = await request(app).post("/books").send({
      isbn: "1234567890",
      amazon_url: "https://amazon.com",
      author: "Test Author",
      language: "english",
      pages: 100,
      publisher: "Test Publisher",
      title: "Test Title",
      year: 2023,
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.book).toHaveProperty("isbn");
  });

  test("Returns 400 for invalid data", async () => {
    const res = await request(app).post("/books").send({}); // missing required isbn
    expect(res.statusCode).toBe(400);
  });

  describe("PUT /books/:isbn", () => {
    test("Updates a book", async () => {
      const res = await request(app).put("/books/0691161518").send({
        isbn: "1234567890",
        amazon_url: "https://amazon.com",
        author: "Test Author",
        language: "english",
        pages: 100,
        publisher: "Test Publisher",
        title: "New Title",
        year: 2023,
      });
      console.log(res);
      expect(res.statusCode).toBe(200);
      expect(res.body.book.title).toBe("New Title");
    });

    test("404 if book not found", async () => {
      const res = await request(app).put("/books/999").send({
        title: "New Title",
      });
      expect(res.statusCode).toBe(404);
    });

    test("400 on invalid data", async () => {
      const res = await request(app).put("/books/0691161518").send({}); // missing required title
      expect(res.statusCode).toBe(400);
    });
  });

  describe("DELETE /books/:isbn", () => {
    test("Deletes a book", async () => {
      const res = await request(app).delete("/books/0691161518");
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ message: "Book deleted" });
    });

    test("404 if book not found", async () => {
      const res = await request(app).delete("/books/999");
      expect(res.statusCode).toBe(404);
    });
  });
});
