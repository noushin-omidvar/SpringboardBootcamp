import React from "react";
import Pokedex from "./Pokedex";

const Pokegame = ({ pokemons }) => {
  // Function to shuffle an array randomly
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Split the list of Pokemon into two hands
  const shuffledPokemon = shuffleArray(pokemons);
  const hand1 = shuffledPokemon.slice(0, 4);
  const hand2 = shuffledPokemon.slice(4);

  // Calculate total experience for each hand
  const calculateTotalExp = (hand) =>
    hand.reduce((acc, curr) => acc + curr.base_experience, 0);
  const totalExp1 = calculateTotalExp(hand1);
  const totalExp2 = calculateTotalExp(hand2);

  // Determine the winner
  const winner = totalExp1 > totalExp2 ? 1 : 2;

  return (
    <div className="Pokegame">
      <Pokedex pokemon={hand1} totalExp={totalExp1} isWinner={winner === 1} />
      <Pokedex pokemon={hand2} totalExp={totalExp2} isWinner={winner === 2} />
    </div>
  );
};

export default Pokegame;
