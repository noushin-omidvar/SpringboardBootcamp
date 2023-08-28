/** Command-line tool to generate Markov text. */

const fs = require("fs");
const axios = require("axios");
const MarkovMachine = require("./markov.js");

/**
 * Fetches text content from a given URL.
 * @param {string} url - The URL to fetch the text from.
 * @returns {Promise<string>} The fetched text content.
 */
async function textFromWeb(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching text from the web: " + error.message);
  }
}

// Read the command line arguments
const args = process.argv.slice(2);

async function main() {
  if (args.length === 2) {
    const [inputType, inputPath] = args;

    let text;
    if (inputType === "file") {
      try {
        text = fs.readFileSync(inputPath, "utf8");
      } catch (error) {
        console.error("Error reading file:", error.message);
        process.exit(1);
      }
    } else if (inputType === "url") {
      if (inputPath.startsWith("http://") || inputPath.startsWith("https://")) {
        try {
          text = await textFromWeb(inputPath);
        } catch (error) {
          console.error("Error fetching text from URL:", error.message);
          process.exit(1);
        }
      } else {
        console.error("Error: Invalid URL format.");
        process.exit(1);
      }
    } else {
      console.error(
        "Usage: node makeText.js [file / url] <path_to_file_or_url>"
      );
      process.exit(1);
    }
    const mm = new MarkovMachine(text);
    mm.makeChains();

    const generatedText = mm.makeText((numWords = 50));
    console.log(generatedText);
  } else {
    console.error("Usage: node makeText.js [file / url] <path_to_file_or_url>");
    process.exit(1);
  }
}

main();
