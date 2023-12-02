import React, { useState } from "react";
import "./App.css";
import Coin from "./coin";
import Counter from "./counter";
import "./App.css";

function App() {
  const [headsCount, setHeadsCount] = useState(0);
  const [tailsCount, setTailsCount] = useState(0);

  const flipCoin = () => {
    const isHeads = Math.random() < 0.5;
    if (isHeads) {
      setHeadsCount(headsCount + 1);
    } else {
      setTailsCount(tailsCount + 1);
    }
  };

  return (
    <div className="App">
      <h1>Coin Flip Counter</h1>
      <Coin flipCoin={flipCoin} />
      <Counter headsCount={headsCount} tailsCount={tailsCount} />
    </div>
  );
}

export default App;
