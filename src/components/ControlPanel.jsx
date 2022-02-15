import React, { useState, useEffect } from "react";
import "./ControlPanel.scss";
import radarIcon from "../assets/radar.png";
import warpIcon from "../assets/portal.png";
import radarSound from "../assets/radar-sound.mp3";
import warpSound from "../assets/warp-sound.mp3";

//Хук для создания объекта Audio
const useAudio = (loop = false, volume, url) => {
  const myAudio = new Audio(url);
  myAudio.loop = loop;
  myAudio.volume = volume;
  const [audio] = useState(myAudio);
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

const ControlPanel = ({ toggleRadarStatus, isRadarOn, getRandomObj }) => {
  const [playing, toggleRadarSound] = useAudio(true, 0.4, radarSound);
  const [playing1, toggleWarpSound] = useAudio(false, 0.4, warpSound);

  const radarHandler = () => {
    toggleRadarSound();
    toggleRadarStatus(!isRadarOn);
  };
  const warpHandler = () => {
    toggleWarpSound();
    setTimeout(() => {
      getRandomObj();
    }, 2000);
  };
  return (
    <div className="panel">
      <div className="panel__btns">
        <img
          className="control"
          src={radarIcon}
          alt=""
          onClick={(e) => radarHandler()}
        />
        <img
          className="control"
          src={warpIcon}
          alt=""
          onClick={() => warpHandler()}
        />
      </div>
    </div>
  );
};

export default ControlPanel;
