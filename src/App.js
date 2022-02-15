import { useEffect, useState } from "react";
import "./App.css";
import Goals from "./components/Goals";
import Ship from "./components/Ship";
import SpaceSky from "./components/SpaceSky";
import TitleScreen from "./components/TitleScreen";
import ControlPanel from "./components/ControlPanel";
import Scores from "./components/Scores";
// import nebula from "./assets/nebula.png";
import star from "./assets/big-star.png";

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
  // console.log("Координаты цели: ", coords.x, ":", coords.y);
  console.log("Координаты корабля: ", shipCoords);

  //Радар
  const [isRadarOn, toggleRadarStatus] = useState(false);
  // Массив с целями задания
  const [goals, setGoals] = useState([]);

  // Запуск начального экрана
  const [titleStatus, setTitle] = useState(false);

  // Определяем координаты клика мыши + изменение статуса движения
  const onClickMouse = (e) => {
    if (e.nativeEvent.offsetX > 0 && e.nativeEvent.offsetY > 0) {
      setCoords({
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY,
      });
    }
  };
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

  if (!titleStatus) {
    return <TitleScreen setTitle={setTitle} />;
  } else {
    return (
      <div className="App">
        <div className="space__test" onClick={(e) => onClickMouse(e)}>
          <SpaceSky />

          <Ship
            isRadarOn={isRadarOn}
            coords={coords}
            shipCoords={shipCoords}
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
        <Scores goals={goals} />
        <ControlPanel
          toggleRadarStatus={toggleRadarStatus}
          isRadarOn={isRadarOn}
          getRandomObj={getRandomObj}
        />
      </div>
    );
  }
}

export default App;
