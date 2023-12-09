/**
 * React component that displays a deck of cards, one card at a time.
 */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const DeckOfCards = () => {
  // State variables
  const [deckId, setDeckId] = useState(""); // The ID of the current deck.
  const [drawnCards, setDrawnCards] = useState([]); // Array of drawn cards.
  const [remainingCards, setRemainingCards] = useState(0); // Number of remaining cards in the deck.
  const isDeckEmpty = remainingCards === 0; // Boolean indicating if the deck is empty.

  // Fetch a new deck when the component mounts.
  useEffect(() => {
    const fetchDeck = async () => {
      const response = await axios.get(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
      );
      setDeckId(response.data.deck_id);
      setRemainingCards(response.data.remaining);
    };
    fetchDeck();
  }, []);

  // Draw a card.
  const drawCard = async () => {
    if (isDeckEmpty) {
      alert("Error: no cards remaining!");
      return;
    }
    const response = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );
    setDrawnCards([...drawnCards, response.data.cards[0]]);
    setRemainingCards(response.data.remaining);
  };

  // Ref to the card image element.
  const cardImageRef = useRef(null);

  // Update the drawn card image when the drawn cards change.
  useEffect(() => {
    if (drawnCards.length > 0) {
      cardImageRef.current.src = drawnCards[drawnCards.length - 1].image;
    }
  }, [drawnCards]);

  return (
    <div>
      <h2>Deck of Cards</h2>
      <button onClick={drawCard}>Draw Card</button>
      <br />
      {drawnCards.length > 0 && (
        <img
          ref={cardImageRef}
          alt="Drawn Card"
          style={{ width: 150, height: 200 }}
        />
      )}
    </div>
  );
};

export default DeckOfCards;
