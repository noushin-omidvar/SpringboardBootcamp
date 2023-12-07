import React, { useState } from "react";
import Box from "./Box";
import { v4 as uuid } from "uuid";
import NewBoxForm from "./NewBoxForm";

const BoxList = () => {
  const INITIAL_STATE = [
    // { id: uuid(), color: "green", width: 200, height: 200 },
    // { id: uuid(), color: "red", width: 200, height: 200 },
    // { id: uuid(), color: "blue", width: 200, height: 200 },
  ];

  const [boxes, setBoxes] = useState(INITIAL_STATE);

  const addBox = (boxes) => {
    const { color, width, height } = boxes;
    setBoxes((boxes) => [...boxes, { id: uuid(), color, width, height }]);
  };

  const removeBox = (evt) => {
    const id = evt.target.parentNode.id;
    setBoxes(boxes.filter((box) => box.id !== id));
  };
  return (
    <div>
      <h1>Box List</h1>
      <NewBoxForm addBox={addBox} />
      <div className="BoxList">
        {boxes.map(({ id, color, height, width }) => (
          <Box
            id={id}
            color={color}
            height={height}
            width={width}
            key={id}
            removeBox={removeBox}
          />
        ))}
      </div>
    </div>
  );
};

export default BoxList;
