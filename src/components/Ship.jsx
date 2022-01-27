import React, { useEffect, useRef } from "react";
import ship from "../assets/ship.png";
import "./Ship.scss";

const Ship = ({ coords, shipCoords, isShipMoving, setShipCoords }) => {
  // Привязка к кораблю
  const ref = useRef();

  // Определяем координаты корабля с обновлением раз в n-мс
  useEffect(() => {
    if (isShipMoving) {
      setInterval(() => {
        const parent = ref.current.parentNode.getBoundingClientRect();
        const elem = ref.current.getBoundingClientRect();
        setShipCoords({
          x: elem.left - parent.left,
          y: elem.top - parent.top,
          width: elem.width,
          height: elem.height,
        });
      }, 40);
    }
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
      <img className="spaceship__img" src={ship} style={shipRotate} alt="" />
    </div>
  );
};

export default Ship;
