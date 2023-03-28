// Get a reference to the HTML element we want to append the data to
const shelf = $("#shelf");

function newCupCake(cupcake) {
  const card = $(
    `<div class="card col-md-4" style="width: 18rem;" data-cupcake-id=${cupcake.id}>`
  );
  card.html(`
  <div class="card-header">
  <button class="btn btn-danger delete-btn small float-right">X</button>

    <img class="card-img-top" src="${cupcake.image}" alt="${cupcake.flavor}" >
  </div>
  <div class="card-body">
    <h5 class="card-title">${cupcake.flavor}</h5>
    <p class="card-text"><b>flavor:</b> ${cupcake.flavor}</p>
    <p class="card-text"><b>size:</b> ${cupcake.size}</p>
    <p class="card-text"><b>rating:</b> ${cupcake.rating}</p>
  </div>



    `);
  // Append the new HTML element to the container element
  shelf.append(card);
}

async function showData() {
  // Make the API call using jQuery and await the response
  const response = await axios.get("api/cupcakes");

  // Iterate over the response data and create a new HTML element for each post
  response.data.cupcakes.forEach((cupcake) => {
    newCupCake(cupcake);
  });
}

/** handle form for adding of new cupcakes */
$("#add-cake").on("click", async function (e) {
  e.preventDefault();
  let flavor = $("form").find('input[name="flavor"]').val();
  let size = $("form").find('input[name="size"]').val();
  let rating = $("form").find('input[name="rating"]').val();
  let image = $("form").find('input[name="image"]').val();
  if (image) {
    data = { flavor, size, rating, image };
  } else {
    data = { flavor, size, rating, image: "https://tinyurl.com/demo-cupcake" };
  }
  console.log(data);
  resp = await axios.post("/api/cupcakes", data);
  newCupCake(data);
});

/** handle clicking delete: delete cupcake */

$("#shelf").on("click", ".delete-btn", async function (e) {
  e.preventDefault();
  let $cupcakeCard = $(e.target).closest(".card");
  let cupcakeId = $cupcakeCard.attr("data-cupcake-id");
  await axios.delete(`api/cupcakes/${cupcakeId}`);
  $cupcakeCard.remove();
});

// Call the async function to get and display the data
showData();
