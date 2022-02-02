import React from "react";
import "./TitleScreen.scss";

const TitleScreen = ({ setTitle }) => {
  return (
    <div className="screen">
      <div className="screen__wrapper">
        <h1>SPACE WANDERER</h1>
        <button className="screen__btn" type="button" onClick={() => setTitle(true)}>
          START
        </button>
      </div>
    </div>
  );
};

export default TitleScreen;
