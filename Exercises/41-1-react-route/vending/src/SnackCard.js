import React from "react";
import "./SnackCard.css";
import SnackDetails from "./SnackDetails";
import { Link } from "react-router-dom";

const SnackCard = ({ name, price, addItem }) => {
  const addToCart = () => {
    addItem(name);
  };

  return (
    <div className="snack-card">
      <Link to={`/snacks/${name}`}>
        <h2>{name}</h2>
      </Link>
      <p>${price.toFixed(2)}</p>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
};

export default SnackCard;
