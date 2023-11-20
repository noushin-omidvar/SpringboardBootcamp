"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Job = require("./job.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** findAll */

describe("findAll", function () {
  test("works", async function () {
    let jobs = await Job.findAll();
    expect(jobs).toEqual([
      {
        company_handle: "c1",
        equity: "0.1",
        id: 1,
        salary: 100,
        title: "Job1",
      },
      {
        company_handle: "c1",
        equity: "0.2",
        id: 2,
        salary: 200,
        title: "Job2",
      },
      {
        company_handle: "c2",
        equity: "0.3",
        id: 3,
        salary: 300,
        title: "Job3",
      },
    ]);
  });
});

/************************************** create */

describe("create", function () {
  const newJob = {
    title: "New Job",
    salary: 100,
    equity: "0.1",
    company_handle: "c1",
  };

  test("works", async function () {
    let job = await Job.create(newJob);
    expect(job).toEqual({
      ...newJob,
    });

    const result = await db.query(
      `SELECT title, salary, equity, company_handle  
         FROM jobs
         WHERE title = 'New Job'`
    );
    expect(result.rows[0]).toEqual({
      title: "New Job",
      salary: 100,
      equity: "0.1",
      company_handle: "c1",
    });
  });
});

/************************************** get */

describe("get", function () {
  test("works", async function () {
    let job = await Job.get(1);
    expect(job).toEqual({
      id: 1,
      title: "Job1",
      salary: 100,
      equity: "0.1",
      company_handle: "c1",
    });
  });

  test("not found if no such job", async function () {
    try {
      await Job.get(0);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

/************************************** update */

describe("update", function () {
  const updateData = {
    title: "New Job Title",
    salary: 200,
    equity: "0.2",
    company_handle: "c1",
  };

  test("works", async function () {
    let job = await Job.update(1, updateData);
    expect(job).toEqual({
      id: 1,
      ...updateData,
    });

    const result = await db.query(
      `SELECT id, title, salary, equity, company_handle 
         FROM jobs
         WHERE id = 1`
    );
    expect(result.rows[0]).toEqual({
      id: 1,
      title: "New Job Title",
      salary: 200,
      equity: "0.2",
      company_handle: "c1",
    });
  });

  test("not found if no such job", async function () {
    try {
      await Job.update(0, updateData);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

/************************************** remove */

describe("remove", function () {
  test("works", async function () {
    await Job.remove(1);
    const res = await db.query("SELECT id FROM jobs WHERE id=1");
    expect(res.rows.length).toEqual(0);
  });

  test("not found if no such job", async function () {
    try {
      await Job.remove(0);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
