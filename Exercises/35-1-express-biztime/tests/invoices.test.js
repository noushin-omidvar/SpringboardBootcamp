// Import necessary modules and configure the test environment
process.env.NODE_ENV = "test";

// Import required npm packages
const request = require("supertest");

// Import the main app and database module
const app = require("../app");
const db = require("../db");

// Define a test company object for use in tests
let testCompany = {
  code: "apple",
  name: "Apple Computer",
  description: "Maker of OSX.",
};

// Define a test invoice object for use in tests
let testInvoice = {
  comp_code: "apple",
  amt: 100,
  paid: false,
  add_date: "2023-10-30T06:00:00.000Z",
  paid_date: null,
  company: {
    code: "apple",
    name: "Apple Computer",
    description: "Maker of OSX.",
  },
};

// Run this code before each test
beforeEach(async function () {
  let result_comp = await db.query(
    `
        INSERT INTO
          companies (code, name, description) VALUES ($1, $2, $3)
          RETURNING code, name, description`,
    [testCompany.code, testCompany.name, testCompany.description]
  );
  testCompany = result_comp.rows[0];

  // Insert the test invoice data into the test database with a description
  let result = await db.query(
    `
    INSERT INTO
      invoices (comp_code, amt, paid, add_date, paid_date) VALUES ($1, $2, $3, $4, $5)
      RETURNING id, comp_code, amt, paid, add_date, paid_date`,
    [
      testInvoice.comp_code,
      testInvoice.amt,
      testInvoice.paid,
      testInvoice.add_date,
      testInvoice.paid_date,
    ]
  );
  testInvoice = result.rows[0];
});

// Run this code after each test to clean up the test data
afterEach(async function () {
  // Delete any data created by the test from the invoices and companies table
  await db.query("DELETE FROM invoices");
  await db.query("DELETE FROM companies");
});

// Run this code after all tests to close the test database connection
afterAll(async function () {
  await db.end();
});

// Test suite for the GET /invoices route
describe("GET /invoices", function () {
  // Test case: Get a list of invoices
  test("Gets a list of 1 invoice", async function () {
    const response = await request(app).get("/invoices"); // Note the correct endpoint "/invoices"

    // Ensure the status code is 200 (OK)
    expect(response.statusCode).toEqual(200);

    // Adjust test expectations to match the actual response structure
    expect(response.body).toEqual({
      invoices: [
        {
          id: expect.any(Number),
          comp_code: "apple",
        },
      ],
    });
  });
});

// Test suite for the GET /invoices/:code route
describe("GET /invoices/:id", function () {
  // Test case: Get a single invoice
  test("Get a single invoice", async function () {
    const response = await request(app).get(`/invoices/${testInvoice.id}`);

    // Ensure the status code is 200 (OK)
    expect(response.statusCode).toEqual(200);
    // Adjust test expectations to match the actual response structure
    expect(response.body).toEqual({
      invoice: {
        id: `${testInvoice.id}`,
        comp_code: "apple",
        amt: 100,
        paid: false,
        add_date: "2023-10-30T06:00:00.000Z",
        paid_date: null,
        company: {
          code: "apple",
          name: "Apple Computer",
          description: "Maker of OSX.",
        },
      },
    });
  });
});

// Test suite for the POST /invoices route
describe("POST /invoices", function () {
  // Test case: Create a new invoice
  test("Creates a new invoice", async function () {
    const response = await request(app).post(`/invoices`).send({
      comp_code: "apple",
      amt: 200,
    });
    expect(response.statusCode).toEqual(201);
    expect(response.body).toEqual({
      invoice: {
        id: expect.any(Number),
        comp_code: "apple",
        amt: 200,
        paid: false,
        add_date: expect.any(String),
        paid_date: null,
      },
    });
  });
});

// Test suite for the PUT /invoices/:code route
describe("PUT /invoices/:id", function () {
  // Test case: Update a single invoice
  test("Updates a single invoice", async function () {
    const response = await request(app)
      .put(`/invoices/${testInvoice.id}`)
      .send({
        amt: 1234,
      });
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      invoice: {
        id: expect.any(Number),
        comp_code: testCompany.code,
        amt: 1234,
        paid: testInvoice.paid,
        add_date: "2023-10-30T06:00:00.000Z",
        paid_date: testInvoice.paid_date,
      },
    });
  });
});

// Test suite for the DELETE /invoices/:code route
describe("DELETE /invoices/:id", function () {
  // Test case: Delete a single invoice
  test("Deletes a single invoice", async function () {
    const response = await request(app).delete(`/invoices/${testInvoice.id}`);
    expect(response.statusCode).toEqual(200); // Expect a 404 status for invoice not found
    expect(response.body).toEqual({ status: "deleted" });
  });

  test("Returns a 404 status when the company cannot be found", async function () {
    const response = await request(app).delete(`/invoices/0`);

    expect(response.statusCode).toEqual(404); // Expect a 404 status for company not found
    expect(response.body).toEqual({ message: "Invoice not found" });
  });
});
