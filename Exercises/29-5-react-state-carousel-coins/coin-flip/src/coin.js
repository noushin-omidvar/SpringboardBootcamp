import React, { useState } from "react";
import headsImage from "./images/heads.png";
import tailsImage from "./images/tails.png";
import "./coin.css";

const Coin = ({ flipCoin }) => {
  const [coinImage, setCoinImage] = useState("");

  const handleCoinFlip = () => {
    flipCoin(); // Call the flipCoin function from props

    // Change the coin image based on heads or tails
    setCoinImage((prevImage) =>
      prevImage === headsImage ? tailsImage : headsImage
    );
  };

  return (
    <div className="coin">
      {coinImage && <img src={coinImage} alt="Coin" className="coin-image" />}
      <button className="coin-flip-button" onClick={handleCoinFlip}>
        Flip Coin
      </button>
    </div>
  );
};

export default Coin;
