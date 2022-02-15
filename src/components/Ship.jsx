import React, { useEffect, useRef, useState } from "react";
import ship from "../assets/ship.png";
import Radar from "./Radar";
import "./Ship.scss";

const Ship = ({ coords, shipCoords, setShipCoords, isRadarOn }) => {
  const [isShipMoving, toggleShip] = useState(false);

  // Привязка к кораблю
  const ref = useRef();

  // Определяем координаты корабля с обновлением раз в n-мс
  function getShipCoords(timer) {
    const update = setInterval(() => {
      const parent = ref.current.parentNode.getBoundingClientRect();
      const elem = ref.current.getBoundingClientRect();
      setShipCoords({
        x: elem.left - parent.left,
        y: elem.top - parent.top,
        width: elem.width,
        height: elem.height,
      });
    }, 80);
    setTimeout(() => {
      clearInterval(update);
    }, timer);
  }

  useEffect(() => {

    if (isShipMoving) {
      getShipCoords(5100);
    }

    const refEl = ref.current;
    refEl.addEventListener("transitionstart", () => {
      toggleShip(true);
    });
    refEl.addEventListener("transitionend", () => {
      toggleShip(false);
    });

    return () => {
      refEl.removeEventListener("transitionstart", () => {
        toggleShip(false);
      });
      refEl.addEventListener("transitionend", () => {
        toggleShip(false);
      });
    };
  }, [isShipMoving]);

  // Перемещение корабля на координаты
  const shipMove = {
    transform: `translate(${coords.x - 30}px, ${coords.y - 30}px)`,
  };
  // Функция вычисления угла оворота корабля к точке маршрута
  function atan() {
    let x = coords.x - shipCoords.x;
    let y = coords.y - shipCoords.y;

    if (x > 0 && y > 0) return 57.2958 * (Math.PI / 2 - Math.atan(x / y));
    if (x < 0 && y > 0) return 57.2958 * (Math.PI / 2 - Math.atan(x / y));
    if (x < 0 && y < 0) return 57.2958 * (Math.PI + Math.atan(y / x));
    if (x > 0 && y < 0)
      return 57.2958 * ((3 * Math.PI) / 2 + Math.abs(Math.atan(x / y)));
  }

  const shipRotate = {
    width: 50,
    height: 50,
    transform: `rotate(${atan() + 90}deg)`,
  };

  return (
    <div className="spaceship" ref={ref} style={shipMove}>
      {isRadarOn ? <Radar /> : null}
      <img className="spaceship__img" src={ship} style={shipRotate} alt="" />
    </div>
  );
};

export default Ship;
