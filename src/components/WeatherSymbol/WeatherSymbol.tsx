import { useEffect } from "react";
import { useCurrWeather } from "../../contexts/currWeatherContext";
import { useTime } from "../../hooks/useTime";
import "./weathersymbol.css";

const clearSky = new Set([1000, 1003]);
const rainy = new Set([
  1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240,
  1243, 1246, 1249, 1252, 1273, 1276,
]);
const cloudy = new Set([1006, 1009, 1030, 1063, 1066, 1069, 1072, 1135, 1147]);
const snowFall = new Set([
  1117, 1114, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1255, 1258,
  1261, 1264, 1279, 1282,
]);

const Sun = ({ visible }: { visible: boolean }) => (
  <div
    className={`weather_symbol__round weather_symbol__sun ${
      !visible ? "opacity-0" : ""
    }`}
  ></div>
);
const Moon = ({ visible }: { visible: boolean }) => (
  <div
    className={`weather_symbol__round weather_symbol__moon ${
      visible ? "" : "opacity-0"
    }`}
  ></div>
);
export const WeatherSymbol = () => {
  const currWeather = useCurrWeather();
  const code = currWeather.currentWeather?.current.condition.code!;
  const isNight = useTime();

  const isClear = clearSky.has(code);
  const isCloudy = cloudy.has(code);

  console.log(isCloudy, isNight);

  useEffect(() => {
    if (clearSky.has(code)) {
      console.log("clear sky");
    } else if (rainy.has(code)) {
      console.log("rainy");
    } else if (cloudy.has(code)) {
      console.log("cloudy");
    } else if (snowFall.has(code)) {
      console.log("snow fall");
    }
  }, [isNight]);

  return (
    <div className="weather_symbol__container">
      {isClear && (isNight ? <Moon visible /> : <Sun visible />)}

      {isCloudy && (
        <>
          {isNight ? <Moon visible={isNight} /> : <Sun visible={!isNight} />}
          <img
            src="./clouds.png"
            alt="clouds"
            className="weather_symbol__clouds"
          />
        </>
      )}

      {rainy.has(code) && (
        <>
          {isNight ? <Moon visible={false} /> : <Sun visible={false} />}
          <img
            src="./rainy.png"
            alt="clouds"
            className="weather_symbol__clouds"
          />
        </>
      )}

      {snowFall.has(code) && (
        <>
          {isNight ? <Moon visible={false} /> : <Sun visible={false} />}
          <img
            src="./clouds.png"
            alt="clouds"
            className="weather_symbol__clouds"
          />
        </>
      )}
    </div>
  );
};
