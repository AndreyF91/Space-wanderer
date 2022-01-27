import { useEffect, useState } from "react";
import "./App.css";
import Goals from "./components/Goals";
import Radar from "./components/Radar";
import Ship from "./components/Ship";
import SpaceSky from "./components/SpaceSky";
// import nebula from "./assets/nebula.png";
import star from "./assets/big-star.png";
import radarIcon from "./assets/radar.png";
import warpIcon from "./assets/portal.png";



function App() {
  // Координаты клика мыши
  const [coords, setCoords] = useState({
    x: "",
    y: "",
  });
  // Координаты корабля
  const [shipCoords, setShipCoords] = useState({
    x: "",
    y: "",
    width: "",
  });

  // Отображение координат
  console.log("Координаты цели: ", coords.x, ":", coords.y);
  // console.log("Координаты корабля: ", shipCoords);

  const [isRadarOn, toggleRadarStatus] = useState(false);

  // Статус движения корабля
  const [isShipMoving, toggleShip] = useState(false);
  // Массив с целями задания
  const [goals, setGoals] = useState([]);

  // Определяем координаты клика мыши + изменение статуса движения
  const onClickMouse = (e) => {
    if (e.nativeEvent.offsetX > 0 && e.nativeEvent.offsetY > 0) {
      toggleShip(true);
      setCoords({
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY,
      });
      setTimeout(() => {
        toggleShip(false);
      }, 5500);
    }
  };

  // const toggleRadar = (e) => {
  //   toggleRadarStatus(!isRadarOn);
  //   e.nativeEvent.stopImmediatePropagation();
  // };

  // Функция нахождения случайного числа в обозначенном диапазоне
  function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  // Функция создания случайного количества целевых объектов
  function getRandomObj() {
    const arr = [];
    for (let i = 0; i <= getRandomInRange(1, 5); i++) {
      arr.push({
        item: star,
        size: getRandomInRange(35, 80),
        x: getRandomInRange(30, 1000),
        y: getRandomInRange(30, 800),
        isDetected: false,
      });
    }
    setGoals(arr);
  }

  useEffect(() => {
    getRandomObj();
  }, []);

  // Функция обнаружения столкновения объектов
  function collisionDetection(obj1, obj2) {
    var XColl = false;
    var YColl = false;
    if (obj1.x + 150 >= obj2.x && obj1.x <= obj2.x + obj2.size) XColl = true;
    if (obj1.y + 150 >= obj2.y && obj1.y <= obj2.y + obj2.size) YColl = true;
    if (XColl & YColl) {
      obj2.isDetected = true;
    }
  }

  useEffect(() => {
    if (goals.length > 0 && isRadarOn) {
      for (let i = 0; i < goals.length; i++) {
        collisionDetection(shipCoords, goals[i]);
      }
    }
  }, [shipCoords]);

  return (
    <div className="App">
      <div className="space__test" onClick={(e) => onClickMouse(e)}>
        <SpaceSky />
        {isRadarOn ? <Radar shipCoords={shipCoords} /> : null}
        <Ship
          isRadarOn={isRadarOn}
          coords={coords}
          shipCoords={shipCoords}
          isShipMoving={isShipMoving}
          setShipCoords={setShipCoords}
        />
        {goals.map((i) => {
          return (
            <Goals
              key={Math.random()}
              name={i.item}
              x={i.x}
              y={i.y}
              size={i.size}
              isDetected={i.isDetected}
            />
          );
        })}
      </div>
      <div className="control__panel">
        <div className="control__panel--btns">
          <img className="radar" src={radarIcon} alt="" onClick={(e) => toggleRadarStatus(!isRadarOn)} />
          <img className="warp" src={warpIcon} alt="" />
        </div>
      </div>
    </div>
  );
}

export default App;
