console.log("hello");

// res = axios.get("/guess").then(function (response) {
//   console.log(response);
// });
$("button[type=submit]").on("click", async function (event) {
  event.preventDefault();
  let formData = {
    guess: $("#guess").val(),
  };
  word = formData["guess"];
  await axios
    .post("/", {
      guess: formData["guess"],
    })
    .then(function (response) {
      let result = response.data.result;
      console.log(result);
      if (result === "ok") {
        // handle valid word
        $("#result").html(word + " is a valid word.");
        $("h4").append(`<li> ${word} </li>`);
      } else if (result === "not-on-board") {
        // handle valid word not on the board
        $("#result").html(word + " is not on board.");
      } else {
        // handle invalid word
        $("#result").html(word + " is not a valid word.");
      }
    });
});
