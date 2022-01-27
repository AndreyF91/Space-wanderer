import React from "react";
import "./Goals.scss";

const Goals = ({ name, size, x, y, isDetected }) => {
  function fn() {
    if (isDetected) {
      return "block";
    }
    return "none";
  }

  const goalsStyle = {
    left: x,
    top: y,
    width: size,
    display: `${fn()}`,
  };

  return <img className="star" src={name} style={goalsStyle} alt="" />;
};

export default Goals;
