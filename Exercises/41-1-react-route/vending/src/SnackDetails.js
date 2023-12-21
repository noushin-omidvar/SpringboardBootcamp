import React from "react";
import { Link } from "react-router-dom";
import "./SnackDetails.css";
import { useParams } from "react-router-dom";

const SnackDetails = () => {
  const { name } = useParams(); // Get name from URL param

  return (
    <div className="SnackDetails">
      <div className="details">
        {/* <img src={image} alt="coca cola can" /> */}
        <div>
          <h2>{name} </h2>
        </div>
      </div>
      <h1>
        <Link to="/">go back</Link>
      </h1>
    </div>
  );
};

export default SnackDetails;
