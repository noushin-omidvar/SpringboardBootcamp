import React from "react";
import "./Box.css";
const Box = ({ id, color, width, height, removeBox }) => {
  const boxStyle = {
    backgroundColor: color,
    width: Number(width),
    height: Number(height),
  };
  return (
    <div id={id} className="Box" style={boxStyle}>
      <button onClick={removeBox}> X </button>
    </div>
  );
};

export default Box;
