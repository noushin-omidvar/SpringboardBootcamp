// Initialize the game state variables
let score = 0; // The player's score
let found = new Set(); // The set of words found by the player
const start = new Date(); // The starting time of the game
const TIMER_DURATION = 20; // The duration of the game timer in seconds

let timer;

// Function to pad a number with leading zeros
function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

// Function to update the game timer display
function updateTimer() {
  const now = new Date();
  let distance = now - start;
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  let remainingSeconds = TIMER_DURATION - seconds;
  document.getElementById("timer").innerHTML =
    pad(remainingSeconds, 2) + ` <i class="fa-solid fa-hourglass-start"></i>`;
  return remainingSeconds;
}

// Function to handle a new game
function handleNewTimedGame() {
  // Start the game timer
  timer = setInterval(function () {
    let remainingSeconds = updateTimer();
    if (remainingSeconds === 0) {
      // Stop the game when the timer runs out
      stopGame();
    }
  }, 1000);
}

// Function to stop the game and display the final score
function stopGame() {
  clearInterval(timer);
  document.getElementById("timer").innerHTML = "EXPIRED";
  $("#TimeOut").modal("show");
  $(".session-score").text(score);
}

handleNewTimedGame();

// Listen for a click event on the new game button
$("#new-game").on("click", (e) => {
  e.preventDefault();
  window.location.href = "/";
});

// Listen for a click event on the form submit button
$("#guess-btn").on("click", async function (event) {
  event.preventDefault();

  // Get the value of the input field
  let word = $("#guess").val();
  $("#guess").val("");
  // Send an AJAX request to the server to check if the word is valid
  response = await axios.post("/game", {
    guess: word,
  });

  let result = response.data.result;
  score = response.data.score;
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
  } else if (result === "not-word") {
    // Handle the case where the word is not valid
    $("#result").html(word + " is not a valid word.");
  }
});
