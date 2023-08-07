/*
Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. 
Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).
*/

let deckId;
async function drawCardNewDeck() {
  let response = await axios.get(
    `https://deckofcardsapi.com/api/deck/new/draw/?count=1`
  );

  const value = response.data.cards[0].value;
  const suit = response.data.cards[0].suit;
  console.log(`${value} of ${suit}`);
}

drawCardNewDeck();

/* 
Make a request to the deck of cards API to request a single card
from a newly shuffled deck. Once you have the card, make a request
 to the same API to get one more card from the same deck.
*/

async function drawCards(numCards) {
  let cards = [];

  let response = await axios.get(
    `https://deckofcardsapi.com/api/deck/new/draw/?count=1`
  );

  cards.push(response.data.cards[0]);
  deckId = response.data.deck_id;
  response = await axios.get(
    `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${numCards - 1}`
  );

  for (let i = 0; i < numCards - 1; i++) {
    let card = response.data.cards[i];
    cards.push(card);
  }

  for (let card of cards) {
    const suit = card.suit;
    const value = card.value;
    console.log(`${value} of ${suit}`);
  }
}

drawCards(4);

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

$("button").on("click", async function drawOneCard() {
  if (remaining > 2) {
    let response = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );

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
  } else {
    alert("No card left in the deck");
  }
});
