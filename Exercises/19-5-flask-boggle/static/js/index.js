$(window).on("load", function () {
  $("#game-modal").modal("show");
});

// Listen for timed-game submit
$("#new-timed-game").submit((e) => {
  e.preventDefault();
  let size = $("#size").val();
  $("#size").val("");
  return axios.post("/game", { size: size });
});
