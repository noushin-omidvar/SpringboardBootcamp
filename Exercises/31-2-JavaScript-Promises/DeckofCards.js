/*
Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. 
Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).
*/

let deckId;

axios
  .get(`https://deckofcardsapi.com/api/deck/new/draw/?count=1`)
  .then((response) => {
    const value = response.data.cards[0].value;
    const suit = response.data.cards[0].suit;
    console.log(`${value} of ${suit}`);
  })
  .catch((error) => {
    console.error("An error occurred:", error);
  });

/* 
Make a request to the deck of cards API to request a single card
from a newly shuffled deck. Once you have the card, make a request
 to the same API to get one more card from the same deck.
*/
let cards = [];

axios
  .get(`https://deckofcardsapi.com/api/deck/new/draw/?count=1`)
  .then((response) => {
    cards.push(response.data.cards[0]);
    deckId = response.data.deck_id;
    return axios.get(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );
  })
  .then((response) => {
    cards.push(response.data.cards[0]);
    for (let card of cards) {
      const suit = card.suit;
      const value = card.value;
      console.log(`${value} of ${suit}`);
    }
  })
  .catch((error) => {
    console.error("An error occurred:", error);
  });

/*
Build an HTML page that lets you draw cards from a deck.
 When the page loads, go to the Deck of Cards API to create
  a new deck, and show a button on the page that will let you
   draw a card. Every time you click the button, display a new card,
    until there are no cards left in the deck.
  */

let remaining;
axios
  .get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
  .then((response) => {
    deckId = response.data.deck_id;
    remaining = response.data.remaining;
  });

$("button").on("click", () => {
  if (remaining > 1) {
    axios
      .get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
      .then((response) => {
        remaining = remaining - 1;
        console.log(remaining);
        let imageSrc = response.data.cards[0].image;
        let angle = Math.random() * 90 - 45;
        let randomX = Math.random() * 40 - 20;
        let randomY = Math.random() * 40 - 20;
        $("#card-panel").append(
          $("<img>", {
            src: imageSrc,
            css: {
              transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`,
            },
          })
        );
      })
      .catch((err) => console.log(err));
  } else {
    alert("No card left in the deck");
  }
});
