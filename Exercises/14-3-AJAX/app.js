const api_key = "et5tXP5TKvoLG8YY82vbcLW8tJ81tg1h";

const $gifArea = $("#gif-body");

function addGIF(srcURL) {
  const $newCol = $("<div>", { class: "col-md-4 col-12 mb-4" });
  const $newGif = $("<img>", {
    class: "rounded",
    src: srcURL,
    width: "100%",
  });
  $newCol.append(
    $(
      '<button type="click" class="close" position="absolute"; color:"red:; z-index:"1";right:"20px";><span>&times;</span></button>'
    )
  );
  $newCol.append($newGif);

  $gifArea.append($newCol);
}

$("form").on("submit", async function (e) {
  e.preventDefault();

  let searchTerm = $("#searchTerm").val();
  try {
    const res = await axios.get(
      "http://api.giphy.com/v1/gifs/search?api_key=" +
        api_key +
        "&q=" +
        searchTerm
    );
    const idx = Math.floor(Math.random() * res.data.data.length);

    const srcURL = res.data.data[idx].images.original.url;
    console.log(srcURL);
    addGIF(srcURL);
    $("#searchTerm").val("");
  } catch (e) {
    const $alert = $("<div>", {
      class: "alert-danger text-center rounded h-100 col-md-4 col-12 mb-4 ",
      role: "alert",
    });
    $alert.append('<h4 class="alert-heading">Oh no!</h4>');
    const $p = $("<p>");
    $p.text("No GIF found for " + searchTerm);
    $alert.append($p);

    $gifArea.append($alert);
    $("#searchTerm").val("");
  }
});

$("#removeAll").on("click", function (e) {
  e.preventDefault();
  $gifArea.empty();
});

$(".close").on("click", function (e) {
  e.preventDefault();
  console.log("test");
});
