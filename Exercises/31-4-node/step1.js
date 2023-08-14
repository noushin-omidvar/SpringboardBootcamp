const fs = require("fs");
//const config = require("./config");

function cat(path) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.log("ERROR: ", err);
    } else {
      console.log(data);
    }
  });
}

// Read the command line arguments
const args = process.argv.slice(2);

if (args.length === 1) {
  const filePath = args[0];
  cat(filePath);
} else {
  console.error("Usage: node step1.js <path_to_file>");
}
