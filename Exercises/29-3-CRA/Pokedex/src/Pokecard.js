import React from "react";
import "./Pokecard.css";

const Pokecard = ({ id, name, type, base_experience }) => (
  <div className="PokeCard">
    <h4 className="PokeCard-title">{name}</h4>
    <img
      className="PokeCard-img"
      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
      alt={name}
      width="200"
    />
    <p>Type: {type}</p>
    <p>Exp: {base_experience}</p>
  </div>
);

export default Pokecard;
