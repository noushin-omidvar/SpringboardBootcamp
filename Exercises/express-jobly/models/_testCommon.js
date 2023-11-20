const bcrypt = require("bcrypt");

const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");

async function commonBeforeAll() {
  // Delete existing data from tables
  await db.query("DELETE FROM companies");
  await db.query("DELETE FROM users");
  await db.query("DELETE FROM jobs");
  await db.query("DELETE FROM applications");

  // Reset the sequence for jobs' id to start from 1
  await db.query("ALTER SEQUENCE jobs_id_seq RESTART WITH 1");

  // Create test companies
  await db.query(`
    INSERT INTO companies(handle, name, num_employees, description, logo_url)
    VALUES ('c1', 'C1', 1, 'Desc1', 'http://c1.img'),
           ('c2', 'C2', 2, 'Desc2', 'http://c2.img'),
           ('c3', 'C3', 3, 'Desc3', 'http://c3.img')`);

  // Create test users
  let results = await db.query(
    `
        INSERT INTO users(username,
                          password,
                          first_name,
                          last_name,
                          email)
        VALUES ('u1', $1, 'U1F', 'U1L', 'u1@email.com'),
               ('u2', $2, 'U2F', 'U2L', 'u2@email.com')
        RETURNING username`,
    [
      await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
      await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
    ]
  );
  // Save user ids
  const u1UserName = results.rows[0].username;
  const u2UserName = results.rows[1].username;

  // Create test jobs
  results = await db.query(`
      INSERT INTO jobs (title, salary, equity, company_handle)
      VALUES ('Job1', 100, 0.1, 'c1'),
             ('Job2', 200, 0.2, 'c1'),
             ('Job3', 300, 0.3, 'c2')
      RETURNING id`);

  // Save job ids
  const j1Id = results.rows[0].id;
  const j2Id = results.rows[1].id;

  await db.query(
    `INSERT INTO applications (username, job_id)
   VALUES ('${u1UserName}', ${j1Id}),
          ('${u1UserName}', ${j2Id}) `
  );
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
};
