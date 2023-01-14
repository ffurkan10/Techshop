import React from "react";
import { Link } from "react-router-dom";

const Error = ({ message }) => {
  return (
    <div className="error">
      <div className="error__container">
        <h1>{message}</h1>
        <Link to="/">
          <p>Try Again</p>
        </Link>
      </div>
    </div>
  );
};

export default Error;
