"use strict";

const $showsList = $("#shows-list");
const $episodesArea = $("#episodes-area");
const $searchForm = $("#search-form");

/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function getShowsByTerm(term) {
  // ADD: Remove placeholder & make request to TVMaze search shows API.
  $("#search-query").val("");
  const shows = [];
  // try {
  const res = await axios.get("http://api.tvmaze.com/search/shows?q=" + term);
  for (let i = 0; i < res.data.length; i++) {
    const { id, name, summary, image } = res.data[i].show;
    if (!(image === null)) {
      shows.push({ id, name, summary, image: image.medium });
    } else {
      let imgMedium = "https://tinyurl.com/tv-missing";
      shows.push({ id, name, summary, image: imgMedium });
    }
  }

  return shows;
  // } catch (e) {
  //   alert("No Show Found!");
  // }
}

/** Given list of shows, create markup for each and to DOM */

function populateShows(shows) {
  $showsList.empty();

  for (let show of shows) {
    const $show = $(
      `<div data-show-id="${show.id}" style="" class="card Show col-sm-12 col-md-6 col-lg-4 g-20 ">
         <div class="media">
           <img 
              src="${show.image}" 
              alt="${show.name}" 
              class="card-img-top w-100 mr-3 mt-3 rounded">
           <div class="media-body">
             <br>
             <h5 class="">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button class="btn btn-outline-secondary btn-sm Show-getEpisodes" >
               Episodes
             </button>
             <button class="btn btn-outline-secondary btn-sm Show-getCasts" >
             Casts
           </button>
             <p>
           </div>
           <br>
         </div> 
       </div>
       <br>
      `
    );

    $showsList.append($show);
  }
}

/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay() {
  const term = $("#search-query").val();
  const shows = await getShowsByTerm(term);

  $episodesArea.hide();
  populateShows(shows);
}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});

/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

async function getEpisodesOfShow(id) {
  const episodes = [];
  // try {
  const res = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`);
  for (let i = 0; i < res.data.length; i++) {
    const { id, name, season, number } = res.data[i];

    episodes.push({ id, name, season, number });
  }
  return episodes;
}

/** Givenan array of episodes info, and populates that into the #episodes-list
 *  part of the DOM. */

function populateEpisodes(episodes) {
  const $episodesList = $("#episodes-list");
  $episodesList.empty();
  for (let episode of episodes) {
    const $episode = $(
      `<li>${episode.name} (season ${episode.season} , episode ${episode.number})</li>`
    );

    $episodesList.append($episode);
  }
}

/** Handle episode display  and get episodes from API and display.
 *    Display episodes area
 */

$("#shows-list").on("click", ".Show-getEpisodes", async function (evt) {
  evt.preventDefault();
  $(evt.target).closest(".Show").siblings().hide();
  const id = $(evt.target).closest(".Show").data("show-id");

  const episodes = await getEpisodesOfShow(id);

  $("#casts-area").hide();
  $episodesArea.show();
  populateEpisodes(episodes);
});

/** Given a show ID, get from API and return (promise) array of casts:
 *      { id, name, season, number }
 */

async function getCastsOfShow(id) {
  const casts = [];
  // try {
  const res = await axios.get(`http://api.tvmaze.com/shows/${id}/cast`);

  for (let i = 0; i < res.data.length; i++) {
    const { id, name, image } = res.data[i].person;
    casts.push({ id, name, image: image.medium });
  }
  return casts;
}

/** Givenan array of episodes info, and populates that into the #casts-list
 *  part of the DOM. */

function populateCasts(casts) {
  const $castsList = $("#casts-list");
  $castsList.empty();
  $episodesArea.hide();
  for (let cast of casts) {
    const $casts = $(`<li>${cast.name}</li>`);

    $castsList.append($casts);
  }
}

/** Handle episode display  and get episodes from API and display.
 *    Display episodes area
 */

$("#shows-list").on("click", ".Show-getCasts", async function (evt) {
  evt.preventDefault();
  $(evt.target).closest(".Show").siblings().hide();
  const id = $(evt.target).closest(".Show").data("show-id");

  const casts = await getCastsOfShow(id);

  $("#casts-area").show();
  populateCasts(casts);
});
