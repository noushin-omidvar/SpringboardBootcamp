const { BadRequestError } = require("../expressError");
const {
  sqlForPartialUpdate,
  sqlForFilterJobs,
  sqlForFilterCompanies,
} = require("./sql.js");

describe("sqlForPartialUpdate", () => {
  it("should generate SQL update string and values", () => {
    const dataToUpdate = { firstName: "Aliya", age: 32 };
    const jsToSql = { firstName: "first_name" };

    const result = sqlForPartialUpdate(dataToUpdate, jsToSql);

    expect(result).toEqual({
      setCols: '"first_name"=$1, "age"=$2',
      values: ["Aliya", 32],
    });
  });

  it("should throw BadRequestError if 'dataToUpdate' is empty", () => {
    const dataToUpdate = {};
    const jsToSql = {};

    expect(() => {
      sqlForPartialUpdate(dataToUpdate, jsToSql);
    }).toThrowError(BadRequestError);
  });
});

describe("sqlForFilterCompany", () => {
  it("should generate SQL conditions", () => {
    const query = { name: "Anderson", minEmployees: 32, maxEmployees: 700 };

    const result = sqlForFilterCompanies(query);

    expect(result).toEqual(
      "WHERE name ILIKE '%Anderson%' AND num_employees > 32 AND num_employees < 700"
    );
  });

  it("should be empty string if query is empty", () => {
    const query = {};

    const result = sqlForFilterCompanies(query);
    expect(result).toEqual("");
  });
});

describe("sqlForFilterJobs", () => {
  it("should generate SQL conditions", () => {
    const query = { title: "Engineer", minSalary: 32000, hasEquity: true };

    const result = sqlForFilterJobs(query);

    expect(result).toEqual(
      "WHERE title ILIKE '%Engineer%' AND salary > 32000 AND equity > 0"
    );
  });

  it("should be empty string if query is empty", () => {
    const query = {};

    const result = sqlForFilterJobs(query);
    expect(result).toEqual("");
  });
});
