const { BadRequestError } = require("../expressError");

/**
 * Generates the SQL query string for a partial update based on provided data.
 * @param {Object} dataToUpdate - An object containing data to be updated in the database.
 * @param {Object} jsToSql - An object that maps JavaScript keys to SQL column names.
 * @returns {Object} - Returns an object with 'setCols' (string) and 'values' (array) for SQL query.
 * @throws {BadRequestError} - Throws an error if 'dataToUpdate' is empty.
 */

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);

  // If 'dataToUpdate' is empty, throw a BadRequestError
  if (keys.length === 0) throw new BadRequestError("No data");

  // Map each key to a SQL-friendly format and create an array of SQL update strings
  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map(
    (colName, idx) => `"${jsToSql[colName] || colName}"=$${idx + 1}`
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

function sqlForFilterCompanies(query) {
  const keys = Object.keys(query);

  if (keys.length === 0) return "";

  let condition = [];
  for (let key of keys) {
    if (key == "name") {
      condition.push(`name ILIKE '%${query["name"]}%'`);
    }
    if (key == "minEmployees") {
      condition.push(`num_employees > ${query[key]}`);
    }
    if (key == "maxEmployees") {
      condition.push(`num_employees < ${query[key]}`);
    }
  }

  return "WHERE " + condition.join(" AND ");
}

function sqlForFilterJobs(query) {
  const keys = Object.keys(query);
  if (keys.length === 0) return "";

  let condition = [];
  for (let key of keys) {
    if (key == "title") {
      condition.push(`${key} ILIKE '%${query[key]}%'`);
    }
    if (key == "minSalary") {
      condition.push(`salary > ${query[key]}`);
    }
    if (key == "hasEquity") {
      condition.push(`equity > 0`);
    }
  }

  return "WHERE " + condition.join(" AND ");
}

module.exports = {
  sqlForPartialUpdate,
  sqlForFilterCompanies,
  sqlForFilterJobs,
};
