const fs = require("fs");
const axios = require("axios");

function cat(path) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.log("ERROR: ", err);
    } else {
      console.log(data);
    }
  });
}

async function webCat(url) {
  try {
    const response = await axios.get(url);
    console.log(response.data);
  } catch (error) {
    console.log("ERROR:", error.message);
  }
}

// Read the command line arguments
const args = process.argv.slice(2);

if (args.length === 1) {
  const input = args[0];
  if (input.startsWith("http://") || input.startsWith("https://")) {
    webCat(input);
  } else {
    cat(input);
  }
} else {
  console.error("Usage: node step2.js <path_to_file_or_url>");
}
