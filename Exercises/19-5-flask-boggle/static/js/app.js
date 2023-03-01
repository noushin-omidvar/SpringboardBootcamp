// Initialize a Set to keep track of found words
let found = new Set();

// Listen for a click event on the form submit button
$("button[type=submit]").on("click", async function (event) {
  event.preventDefault();

  // Get the value of the input field
  let word = $("#guess").val();

  // Send an AJAX request to the server to check if the word is valid
  await axios
    .post("/", {
      guess: word,
    })
    .then(function (response) {
      let result = response.data.result;
      let score = response.data.score;

      // Check if the word has already been found
      if (found.has(word)) {
        $("#result").html(word + " is already found.");
      } else if (result === "ok") {
        // Handle the case where the word is valid
        found.add(word);
        $("#result").html(word + " is a valid word.");
        $("ul").append(`<li> ${word} </li>`);
        $("#score").text(score + " POINTS");
      } else if (result === "not-on-board") {
        // Handle the case where the word is valid but not on the board
        $("#result").html(word + " is not on board.");
      } else {
        // Handle the case where the word is not valid
        $("#result").html(word + " is not a valid word.");
      }
    });
});
