const express = require("express");
const db = require("../db");
const router = express.Router();

/**
 * GET /companies
 * Returns a list of companies.
 * Response format: { companies: [{code, name}, ...] }
 */
router.get("/", async function (req, res, next) {
  try {
    // Retrieve a list of companies from the database
    const results = await db.query(`SELECT * FROM companies`);

    // Extract the relevant company data and send it as a response
    const companies = results.rows.map((row) => {
      const { description, ...companyData } = row;
      return companyData;
    });

    return res.json({ companies });
  } catch (err) {
    return next(err);
  }
});

/**
 * GET /companies/[code]
 * Returns information about a specific company, including its associated industries.
 * Response format: { company: {code, name, description, industries: [industry_name, ...], invoices: [id, ...] } }
 * If the company is not found, a 404 status response is returned.
 */
router.get("/:code", async function (req, res, next) {
  try {
    const code = req.params.code; // Obtain the 'code' parameter from req.params

    // Retrieve company details from the database and join with industries
    const results = await db.query(
      `SELECT c.code, c.name, c.description, i.industry
       FROM companies c
       LEFT JOIN company_industries ci ON c.code = ci.company_code
       LEFT JOIN industries i ON ci.industry_code = i.code
       WHERE c.code = $1`,
      [code]
    );

    // Retrieve invoice IDs associated with the company
    const results_invoices_id = await db.query(
      `SELECT id FROM invoices WHERE comp_code = $1`,
      [code]
    );
    const ids = results_invoices_id.rows.map((item) => item.id);

    if (results.rows.length === 0) {
      // If no results are found, return a "Company not found" message
      return res.status(404).json({ message: "Company not found" });
    }

    // Extract unique industry names
    const industries = Array.from(
      new Set(results.rows.map((row) => row.industry).filter(Boolean))
    );

    // Return the company information, associated industries, and invoice IDs
    return res.json({
      company: {
        code: results.rows[0].code,
        name: results.rows[0].name,
        description: results.rows[0].description,
        industries: industries,
      },
      invoices: ids,
    });
  } catch (err) {
    return next(err);
  }
});

/**
 * POST /companies
 * Adds a new company.
 * Expects data in JSON body: { code, name, description }
 * Response format: { company: {code, name, description} }
 */
router.post("/", async function (req, res, next) {
  try {
    const { name, description } = req.body;
    // Generate the company code using slugify
    const code = slugify(name, {
      lower: true,
      remove: /[*+~.()'"!:@]/g, // Specify the characters to remove
      replacement: "-", // Replace spaces and removed characters with a hyphen
    });

    // Insert the new company data into the database
    const result = await db.query(
      `INSERT INTO companies (code, name, description) 
       VALUES ($1, $2, $3)
       RETURNING code, name, description`,
      [code, name, description]
    );

    return res.status(201).json({ company: result.rows[0] });
  } catch (err) {
    return next(err);
  }
});

/**
 * PATCH /companies/[code]
 * Edits an existing company.
 * Response format: { company: {code, name, description} }
 * If the company cannot be found, a 404 status response is returned.
 */
router.patch("/:code", async function (req, res, next) {
  try {
    const { name, description } = req.body;

    // Update the company data in the database
    const result = await db.query(
      `UPDATE companies SET name = $1, description = $2
       WHERE code = $3
       RETURNING code, name, description`,
      [name, description, req.params.code]
    );

    if (result.rows.length === 0) {
      // If no results are found, return a "Company not found" message
      return res.status(404).json({ message: "Company not found" });
    }

    return res.json({ company: result.rows[0] });
  } catch (err) {
    return next(err);
  }
});

/**
 * DELETE /companies/[code]
 * Deletes a company.
 * Response format: { status: "deleted" }
 * If the company cannot be found, a 404 status response is returned.
 */
router.delete("/:code", async function (req, res, next) {
  try {
    // Delete the company from the database
    const result = await db.query(
      `DELETE FROM companies WHERE code = $1 RETURNING *`,
      [req.params.code]
    );

    if (result.rows.length === 0) {
      // If no results are found, return a "Company not found" message
      return res.status(404).json({ message: "Company not found" });
    }

    return res.json({ message: "Company deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
