import React, { useState } from "react";
import "./eightball.css";

function getRandom(max) {
  return Math.floor(Math.random() * max);
}

function Eightball(props) {
  const max = Object.keys(props).length - 1;

  const random_answer = props[getRandom(max)];
  const [color, setColor] = useState(random_answer.color);
  const [text, setText] = useState(random_answer.msg);

  const setBall = () => {
    const random_num = getRandom(max);
    const random_answer = props.answer[random_num];
    setColor(random_answer.color);
    setText(random_answer.msg);
  };

  return (
    <div
      className="eightball"
      style={{ backgroundColor: color }}
      onClick={setBall}
    >
      <i>
        <b className="eightball-text">{text}</b>
      </i>
    </div>
  );
}

Eightball.defaultProps = {
  answer: [
    { msg: "It is certain.", color: "green" },
    { msg: "It is decidedly so.", color: "green" },
    { msg: "Without a doubt.", color: "green" },
    { msg: "Yes - definitely.", color: "green" },
    { msg: "You may rely on it.", color: "green" },
    { msg: "As I see it, yes.", color: "green" },
    { msg: "Most likely.", color: "green" },
    { msg: "Outlook good.", color: "green" },
    { msg: "Yes.", color: "green" },
    { msg: "Signs point to yes.", color: "goldenrod" },
    { msg: "Reply hazy, try again.", color: "goldenrod" },
    { msg: "Ask again later.", color: "goldenrod" },
    { msg: "Better not tell you now.", color: "goldenrod" },
    { msg: "Cannot predict now.", color: "goldenrod" },
    { msg: "Concentrate and ask again.", color: "goldenrod" },
    { msg: "Don't count on it.", color: "red" },
    { msg: "My reply is no.", color: "red" },
    { msg: "My sources say no.", color: "red" },
    { msg: "Outlook not so good.", color: "red" },
    { msg: "Very doubtful.", color: "red" },
  ],
};

export default Eightball;
