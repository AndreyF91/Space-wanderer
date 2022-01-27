import React from "react";
import "./Radar.scss";

const Radar = ({ shipCoords }) => {
  const radarStyle = {
    left: shipCoords.x - 20,
    top: shipCoords.y - 20,
  };

  return (
    <div className="radar" style={radarStyle}>
      <div className="radar__wave"></div>
    </div>
  );
};

export default Radar;
