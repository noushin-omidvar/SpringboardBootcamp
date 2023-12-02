import React, { useState } from "react";

const Counter = ({ headsCount, tailsCount }) => {
  return (
    <div>
      Out of {headsCount + tailsCount} flips, there have been {headsCount} heads
      and {tailsCount} tails.
    </div>
  );
};

export default Counter;
