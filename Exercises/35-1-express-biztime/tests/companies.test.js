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

// Run this code before each test
beforeEach(async function () {
  // Insert the test company data into the test database with a description
  let result = await db.query(
    `
    INSERT INTO
      companies (code, name, description) VALUES ($1, $2, $3)
      RETURNING code, name, description`,
    [testCompany.code, testCompany.name, testCompany.description]
  );
  testCompany = result.rows[0];
});

// Run this code after each test to clean up the test data
afterEach(async function () {
  // Delete any data created by the test from the companies table
  await db.query("DELETE FROM companies");
});

// Run this code after all tests to close the test database connection
afterAll(async function () {
  await db.end();
});

// Test suite for the GET /companies route
describe("GET /companies", function () {
  // Test case: Get a list of companies
  test("Gets a list of 1 company", async function () {
    const response = await request(app).get("/companies"); // Note the correct endpoint "/companies"

    // Ensure the status code is 200 (OK)
    expect(response.statusCode).toEqual(200);

    // Adjust test expectations to match the actual response structure
    expect(response.body).toEqual({
      companies: [
        {
          code: testCompany.code,
          name: testCompany.name,
        },
      ],
    });
  });
});

// Test suite for the GET /companies/:code route
describe("GET /companies/:code", function () {
  // Test case: Get a single company
  test("Get a single company", async function () {
    const response = await request(app).get(`/companies/${testCompany.code}`);

    // Ensure the status code is 200 (OK)
    expect(response.statusCode).toEqual(200);

    // Adjust test expectations to match the actual response structure
    expect(response.body).toEqual({ company: testCompany, invoices: [] });
  });
});

// Test suite for the POST /companies route
describe("POST /companies", function () {
  // Test case: Create a new company
  test("Creates a new company", async function () {
    const response = await request(app).post(`/companies`).send({
      code: "google",
      name: "Google",
      description: "software",
    });
    expect(response.statusCode).toEqual(201);
    expect(response.body).toEqual({
      company: {
        code: "google",
        name: "Google",
        description: "software",
      },
    });
  });
});

// Test suite for the PATCH /companies/:code route
describe("PATCH /companies/:code", function () {
  // Test case: Update a single company
  test("Updates a single company", async function () {
    const response = await request(app)
      .patch(`/companies/${testCompany.code}`)
      .send({
        name: "Troll",
        description: testCompany.description,
      });
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      company: {
        code: testCompany.code,
        name: "Troll",
        description: testCompany.description,
      },
    });
  });

  // Test case: Respond with 404 if the company can't be found
  test("Responds with 404 if can't find company", async function () {
    const response = await request(app).patch(`/companies/0`);
    expect(response.statusCode).toEqual(404);
  });
});

// Test suite for the DELETE /companies/:code route
describe("DELETE /companies/:code", function () {
  // Test case: Delete a single company
  test("Deletes a single company", async function () {
    const response = await request(app).delete(
      `/companies/${testCompany.code}`
    );
    expect(response.statusCode).toEqual(200); // Expect a 200 status for company not found
    expect(response.body).toEqual({ message: "Company deleted" });
  });
});
