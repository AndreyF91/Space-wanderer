import React, { useEffect } from "react";
import "./Scores.scss";

const Scores = ({ goals }) => {
    const scores = goals
    .slice()
    .filter((score) => score.isDetected === true).length;

  return (
    <div className="scores">
      <span>
        {scores}/{goals.length}
      </span>
    </div>
  );
};

export default Scores;
