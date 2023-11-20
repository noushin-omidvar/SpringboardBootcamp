const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate, sqlForFilterJobs } = require("../helpers/sql");

/** Related functions for jobs */
class Job {
  /** Create a job, update db, return new job data.
   *
   * Data should be {title, salary, equity, company_handle}
   *
   * Returns {id, title, salary, equity, company_handle}
   */

  static async create({ title, salary, equity, company_handle }) {
    // create job in db
    const result = await db.query(
      `INSERT INTO jobs (title, salary, equity, company_handle)  
       VALUES ($1, $2, $3, $4)
       RETURNING title, salary, equity, company_handle`,
      [title, salary, equity, company_handle]
    );
    const job = result.rows[0];

    return job;
  }

  static async filter(query) {
    const condition = sqlForFilterJobs(query);
    const jobsRes = await db.query(
      `SELECT id, 
      title, 
      salary,
      equity,
      company_handle 
      FROM jobs
        ${condition}
       ORDER BY title`
    );
    return jobsRes.rows;
  }
  /** Find all jobs.
   *
   * Returns [ {id, title, salary, equity, company_handle}, ...]
   **/

  static async findAll() {
    const jobsRes = await db.query(
      `SELECT id, 
              title, 
              salary,
              equity,
              company_handle 
       FROM jobs
       ORDER BY title`
    );
    return jobsRes.rows;
  }

  /** Given id, return data about job.
   *
   * Returns {id, title, salary, equity, company_handle}
   *
   * Throws NotFoundError if not found.
   **/

  static async get(id) {
    // get job from db
    const jobRes = await db.query(
      `SELECT id, 
              title, 
              salary,
              equity,
              company_handle
       FROM jobs
       WHERE id = $1`,
      [id]
    );

    const job = jobRes.rows[0];

    if (!job) throw new NotFoundError(`No job: ${id}`);

    return job;
  }

  /** Update job data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include: {title, salary, equity}
   *
   * Returns {id, title, salary, equity, company_handle}
   *
   * Throws NotFoundError if not found.
   */

  static async update(id, data) {
    // generate sql query and values for partial update
    const { setCols, values } = sqlForPartialUpdate(data, {});
    const idVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE jobs  
                      SET ${setCols} 
                      WHERE id = ${idVarIdx}  
                      RETURNING id, 
                                title, 
                                salary, 
                                equity,
                                company_handle `;

    // update job in db
    const result = await db.query(querySql, [...values, id]);
    const job = result.rows[0];

    if (!job) throw new NotFoundError(`No job: ${id}`);

    return job;
  }

  /** Delete given job from database; returns undefined.
   *
   * Throws NotFoundError if job not found.
   **/

  static async remove(id) {
    const result = await db.query(
      `DELETE
           FROM jobs
           WHERE id = $1
           RETURNING id`,
      [id]
    );

    const job = result.rows[0];

    if (!job) throw new NotFoundError(`No job: ${id}`);
  }
}

module.exports = Job;
