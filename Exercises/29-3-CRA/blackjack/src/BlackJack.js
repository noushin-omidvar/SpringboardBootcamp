import React, { useState, useEffect } from "react";
import axios from "axios";

const BlackJack = () => {
  const [cards, setCards] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://deckofcardsapi.com/api/deck/new/draw/?count=2"
        );
        const fetchedCards = response.data.cards;
        setCards(fetchedCards);

        // Calculate the total value
        const value = fetchedCards.reduce(
          (acc, curr) => acc + getValue(curr.value),
          0
        );
        setTotalValue(value);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Function to convert card value to a numeric value
  const getValue = (cardValue) => {
    if (isNaN(cardValue)) {
      // For non-numeric values like "KING", "QUEEN", etc.
      return 10;
    } else {
      return parseInt(cardValue);
    }
  };

  return (
    <div>
      {cards.map((card, index) => (
        <img
          key={index}
          className={`BlackJack-img-${index}`}
          src={card.image}
          alt={card.suit}
          width="200"
        />
      ))}
      <h3> Score: {totalValue}</h3>
    </div>
  );
};

export default BlackJack;
