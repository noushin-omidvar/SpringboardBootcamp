import React from "react";
import SnackList from "./SnackList";
const Vending = ({ addItem }) => {
  return (
    <div className="machine">
      <h1>Shop</h1>
      <SnackList addItem={addItem} />
    </div>
  );
};

export default Vending;
