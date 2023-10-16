const fs = require("fs");
const express = require("express");
const ExpressError = require("./expressError");

const app = express();

function calculateMean(nums) {
  const sum = nums.reduce((acc, num) => acc + num, 0);
  return sum / nums.length;
}

function calculateMedian(nums) {
  const sortedNums = nums.sort((a, b) => a - b);
  const middleIndex = Math.floor(sortedNums.length / 2);
  if (nums.length % 2 == 0) {
    return (sortedNums[middleIndex - 1] + sortedNums[middleIndex]) / 2;
  } else {
    return sortedNums[middleIndex];
  }
}

function calculateMode(nums) {
  const numCounts = {};
  let maxCount = 0;
  let mode = null;

  nums.forEach((num) => {
    numCounts[num] = (numCounts[num] || 0) + 1;

    if (numCounts[num] > maxCount) {
      maxCount = numCounts[num];
      mode = num;
    }
  });

  return mode;
}

function saveToFile(response) {
  const timestamp = new Date().toISOString();
  response["timestamp"] = timestamp;
  const data = JSON.stringify(response);
  fs.appendFileSync("results.json", data);
}

app.get("/mean", (req, resp, next) => {
  if (!req.query.nums) {
    throw new ExpressError(
      "You must pass a query key of nums with a comma-separated list of numbers.",
      400
    );
  }
  let nums = req.query.nums.split(",");
  const saveToFileFlag = req.query.save === "true";
  const input = nums;
  nums = nums.map((num) => parseFloat(num));
  for (let i = 0; i < nums.length; i++) {
    if (isNaN(nums[i]))
      throw new ExpressError(`${input[i]} is not a number`, 404);
  }
  try {
    meanValue = calculateMean(nums);

    const response = {
      operation: "mean",
      value: meanValue,
    };
    if (saveToFileFlag) {
      saveToFile(response);
    }
    if (req.accepts("json")) {
      return resp.json(response);
    } else {
      resp.send(response);
    }
  } catch (err) {
    return next(err);
  }
});

app.get("/median", (req, resp, next) => {
  if (!req.query.nums) {
    throw new ExpressError(
      "You must pass a query key of nums with a comma-separated list of numbers.",
      400
    );
  }
  const saveToFileFlag = req.query.save === "true";
  let nums = req.query.nums.split(",");
  const input = nums;
  nums = nums.map((num) => parseFloat(num));
  for (let i = 0; i < nums.length; i++) {
    if (isNaN(nums[i]))
      throw new ExpressError(`${input[i]} is not a number`, 404);
  }
  try {
    medianValue = calculateMedian(nums);

    const response = {
      operation: "median",
      value: medianValue,
    };
    if (saveToFileFlag) {
      saveToFile(response);
    }
    if (req.accepts("json")) {
      return resp.json(response);
    } else {
      resp.send(response);
    }
  } catch (err) {
    return next(err);
  }
});

app.get("/mode", (req, resp, next) => {
  if (!req.query.nums) {
    throw new ExpressError(
      "You must pass a query key of nums with a comma-separated list of numbers.",
      400
    );
  }
  const saveToFileFlag = req.query.save === "true";
  let nums = req.query.nums.split(",");
  const input = nums;
  nums = nums.map((num) => parseFloat(num));
  for (let i = 0; i < nums.length; i++) {
    if (isNaN(nums[i]))
      throw new ExpressError(`${input[i]} is not a number`, 404);
  }
  try {
    modeValue = calculateMode(nums);

    const response = {
      operation: "mode",
      value: calculateMode(nums),
    };
    if (saveToFileFlag) {
      saveToFile(response);
    }
    if (req.accepts("json")) {
      return resp.json(response);
    } else {
      resp.send(response);
    }
  } catch (err) {
    return next(err);
  }
});

app.get("/all", (req, resp, next) => {
  if (!req.query.nums) {
    throw new ExpressError(
      "You must pass a query key of nums with a comma-separated list of numbers.",
      400
    );
  }
  const saveToFileFlag = req.query.save === "true";
  let nums = req.query.nums.split(",");
  const input = nums;
  nums = nums.map((num) => parseFloat(num));
  for (let i = 0; i < nums.length; i++) {
    if (isNaN(nums[i]))
      throw new ExpressError(`${input[i]} is not a number`, 404);
  }
  try {
    const nums = req.query.nums.split(",").map((num) => parseFloat(num));
    const response = {
      operation: "all",
      mean: calculateMean(nums),
      median: calculateMedian(nums),
      mode: calculateMode(nums),
    };
    if (saveToFileFlag) {
      saveToFile(response);
    }
    if (req.accepts("json")) {
      return resp.json(response);
    } else {
      resp.send(response);
    }
  } catch (err) {
    return next(err);
  }
});

app.use(function (err, req, res, next) {
  // the default status is 500 Internal Server Error
  let status = err.status || 500;
  let message = err.message;

  // set the status and alert the user
  return res.status(status).json({
    error: { message, status },
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
