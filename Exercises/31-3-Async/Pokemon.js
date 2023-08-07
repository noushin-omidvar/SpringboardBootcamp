const BASE_API_URL = "https://pokeapi.co/api/v2/pokemon";
const BASE_SPECIES_API_URL = "https://pokeapi.co/api/v2/pokemon-species";

async function getAll() {
  try {
    let response = await axios.get(BASE_API_URL);
    let results = response.data.results;
    return results;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

async function getRandomPokemon(num, results) {
  let promises = [];
  for (let i = 0; i < num; i++) {
    const randNum = Math.floor(Math.random() * results.length);
    promises.push(axios.get(results[randNum].url));
  }

  let pokemons = await Promise.all(promises);
  return pokemons.map((pokemon) => ({
    name: pokemon.data.name,
    imageUrl: pokemon.data.sprites.front_default,
    speciesUrl: pokemon.data.species.url,
  }));
}

async function getSpeciesDescription(url) {
  try {
    const response = await axios.get(url);
    for (let entry of response.data.flavor_text_entries) {
      if (entry.language.name === "en") {
        return entry.flavor_text;
      }
    }
    return "No description found in English.";
  } catch (error) {
    console.error("Error fetching species data:", error);
    return "Error fetching species data.";
  }
}

async function main() {
  let results = await getAll();

  $("button").on("click", async function () {
    $("#pokemon-info").empty();
    let randomPokemons = await getRandomPokemon(3, results);
    for (let pokemon of randomPokemons) {
      const description = await getSpeciesDescription(pokemon.speciesUrl);
      const infoText = `${pokemon.name}: ${description}`;
      const $pokemonCard = $("<div>", { class: "card card-body" }).addClass(
        "pokemon-card"
      );
      $pokemonCard.append($("<h3>").text(pokemon.name));
      $pokemonCard.append($("<img>").attr("src", pokemon.imageUrl));
      $pokemonCard.append($("<p>").text(description));
      $("#pokemon-info").append($pokemonCard);
      $("#pokemon-info").append("<br>");
    }
  });
}

main();
