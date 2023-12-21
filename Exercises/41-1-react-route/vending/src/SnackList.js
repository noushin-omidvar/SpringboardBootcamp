import React from "react";
import SnackCard from "./SnackCard";
import "./SnackList.css";

const SnackList = ({ addItem }) => {
  return (
    <div className="snack-list">
      <SnackCard name="Chips" price={1.5} addItem={addItem} />
      <SnackCard name="Coke" price={1.5} addItem={addItem} />
      <SnackCard name="Candy" price={1.5} addItem={addItem} />
      <SnackCard name="Pretzel" price={1.5} addItem={addItem} />
    </div>
  );
};

export default SnackList;
