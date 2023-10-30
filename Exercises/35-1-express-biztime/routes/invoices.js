const express = require("express");
const db = require("../db");
const router = express.Router();

/**
 * GET /invoices
 * Returns a list of invoices.
 * Response format: { invoices: [{id, comp_code}, ...] }
 */
router.get("/", async function (req, res, next) {
  try {
    // Retrieve a list of invoices from the database
    const results = await db.query(`SELECT id, comp_code FROM invoices`);

    // Extract and send the invoice data as a response
    const invoices = results.rows;

    return res.json({ invoices });
  } catch (err) {
    return next(err);
  }
});

/**
 * GET /invoices/:id
 * Returns details of an invoice with a specific ID.
 * Response format: { invoice: {id, comp_code, amt, paid, add_date, paid_date, company: {code, name, description}} }
 * If the invoice cannot be found, a 404 status response is returned.
 */
router.get("/:id", async function (req, res, next) {
  try {
    const id = req.params.id; // Obtain the 'id' parameter from req.params

    // Retrieve invoice details from the database, including company information
    const results = await db.query(
      `SELECT i.id, i.amt, i.paid, i.add_date, i.paid_date, c.code, c.name, c.description
      FROM invoices AS i
      JOIN companies AS c ON i.comp_code = c.code
      WHERE i.id = $1`,
      [id]
    );

    if (results.rows.length === 0) {
      // If no results are found, return a "Invoice not found" message
      return res.status(404).json({ message: "Invoice not found" });
    }

    // Extract and return the invoice and company information
    const { amt, paid, add_date, paid_date, code, name, description } =
      results.rows[0];
    const invoice = {
      id,
      comp_code: code,
      amt,
      paid,
      add_date,
      paid_date,
      company: { code, name, description },
    };

    return res.json({ invoice });
  } catch (err) {
    return next(err);
  }
});

/**
 * POST /invoices
 * Adds a new invoice.
 * Expects data in JSON body: { comp_code, amt }
 * Response format: { invoices: { id, comp_code, amt, paid, add_date, paid_date } }
 */
router.post("/", async function (req, res, next) {
  try {
    const { comp_code, amt } = req.body;

    // Check if the company exists before adding an invoice
    const existingCompany = await db.query(
      "SELECT code FROM companies WHERE code = $1",
      [comp_code]
    );

    if (existingCompany.rows.length === 0) {
      return res.json({ Error: "Company not Found" });
    }

    // Insert the new invoice into the database
    const result = await db.query(
      `INSERT INTO invoices (comp_code, amt)
             VALUES ($1, $2) 
             RETURNING id, comp_code, amt, paid, add_date, paid_date`,
      [comp_code, amt]
    );

    return res.status(201).json({ invoice: result.rows[0] });
  } catch (err) {
    return next(err);
  }
});

/**
 * PUT /invoices/:id
 * Updates an invoice.
 * Response format: { invoice: {id, comp_code, amt, paid, add_date, paid_date} }
 * If the invoice cannot be found, a 404 status response is returned.
 * Expects data in JSON body: { amt }
 */
router.put("/:id", async function (req, res, next) {
  try {
    const { amt, paid } = req.body;
    const id = req.params.id;

    let query, values;

    if (paid) {
      // If paying the invoice, set paid_date to today
      query = `UPDATE invoices SET amt = $1, paid = true, paid_date = CURRENT_DATE
               WHERE id = $2
               RETURNING id, comp_code, amt, paid, add_date, paid_date`;
      values = [amt, id];
    } else if (paid === false) {
      // If un-paying, set paid_date to null
      query = `UPDATE invoices SET amt = $1, paid = false, paid_date = null
               WHERE id = $2
               RETURNING id, comp_code, amt, paid, add_date, paid_date`;
      values = [amt, id];
    } else {
      // For other cases, keep the current paid_date
      query = `UPDATE invoices SET amt = $1
               WHERE id = $2
               RETURNING id, comp_code, amt, paid, add_date, paid_date`;
      values = [amt, id];
    }

    // Update the invoice data in the database
    const result = await db.query(query, values);

    if (result.rows.length === 0) {
      // If no results are found, return a "Invoice not found" message
      return res.status(404).json({ message: "Invoice not found" });
    }

    return res.json({ invoice: result.rows[0] });
  } catch (err) {
    return next(err);
  }
});

/**
 * DELETE /invoices/:id
 * Deletes an invoice.
 * Response format: { status: "deleted" }
 * If the invoice cannot be found, a 404 status response is returned.
 */
router.delete("/:id", async function (req, res, next) {
  try {
    const id = req.params.id;

    // Delete the invoice from the database
    const result = await db.query(
      `DELETE FROM invoices WHERE id = $1 RETURNING id`,
      [id]
    );

    if (result.rows.length === 0) {
      // If no results are found, return a "Invoice not found" message
      return res.status(404).json({ message: "Invoice not found" });
    }

    return res.json({ status: "deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
