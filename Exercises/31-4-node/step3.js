const fs = require("fs");
const axios = require("axios");

function cat(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

async function webCat(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

function catWrite(path, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, content, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

async function catAndOutput(input, outputPath = null) {
  try {
    let content;

    if (input.startsWith("http://") || input.startsWith("https://")) {
      content = await webCat(input);
    } else {
      content = await cat(input);
    }

    if (outputPath) {
      await catWrite(outputPath, content);
      console.log(`${outputPath} written successfully.`);
    } else {
      console.log(content);
    }
  } catch (error) {
    console.error("ERROR:", error.message);
  }
}

// Read the command line arguments
const args = process.argv.slice(2);

if (args.length === 1) {
  const input = args[0];
  catAndOutput(input);
} else if (args.length === 3 && args[0] === "--out") {
  const outputPath = args[1];
  const input = args[2];
  catAndOutput(input, outputPath);
} else {
  console.error(
    "Usage: node step3.js [--out <output_file>] <path_to_file_or_url>"
  );
}
