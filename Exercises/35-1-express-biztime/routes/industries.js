const express = require("express");
const db = require("../db");
const router = express.Router();

// POST /industries
// Adds a new industry.
// Expects data in JSON body: { code, industry }
// Response format: { industry: { code, industry } }
router.post("/", async function (req, res, next) {
  try {
    const { code, industry } = req.body;

    // Insert the new industry data into the database
    const result = await db.query(
      `INSERT INTO industries (code, industry) 
         VALUES ($1, $2)
         RETURNING code, industry`,
      [code, industry]
    );

    return res.status(201).json({ industry: result.rows[0] });
  } catch (err) {
    return next(err);
  }
});

// GET /industries
// Returns a list of all industries with associated company codes.
// Response format: { industries: [{ code, industry, companies: [company_code, ...] }, ...] }
router.get("/", async function (req, res, next) {
  try {
    // Retrieve a list of industries and associated company codes from the database
    const results = await db.query(`
        SELECT i.code, i.industry, array_agg(ci.company_code) AS companies
        FROM industries i
        LEFT JOIN company_industries ci ON i.code = ci.industry_code
        GROUP BY i.code, i.industry
      `);

    // Extract the relevant data and send it as a response
    const industries = results.rows.map((row) => row);

    return res.json({ industries });
  } catch (err) {
    return next(err);
  }
});

// POST /industries/:industryCode/companies/:companyCode
// Associates a company with an industry.
// Response format: { message: "Association created" }
router.post(
  "/:industryCode/companies/:companyCode",
  async function (req, res, next) {
    try {
      const { industryCode, companyCode } = req.params;

      // Check if the association already exists
      const existingAssociation = await db.query(
        "SELECT 1 FROM company_industries WHERE industry_code = $1 AND company_code = $2",
        [industryCode, companyCode]
      );

      if (existingAssociation.rows.length === 0) {
        // If the association does not exist, create it
        await db.query(
          `INSERT INTO company_industries (industry_code, company_code) 
           VALUES ($1, $2)`,
          [industryCode, companyCode]
        );
      }

      return res.json({ message: "Association created" });
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;
