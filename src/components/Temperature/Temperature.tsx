import "./temperature.css";
import { useCurrWeather } from "../../contexts/currWeatherContext";
import { useTemperatureContext } from "../../contexts/temperatureContext";

export const Temperature = () => {
  const currWeather = useCurrWeather();
  const { mode } = useTemperatureContext();

  return (
    <div className="temperature">
      <div className="temperature__container">
        <div className="temperature__value">
          {mode === "fahrenheit"
            ? currWeather?.currentWeather?.current.temp_f
            : currWeather?.currentWeather?.current.temp_c}

          {mode === "fahrenheit" ? <sup>&deg;F</sup> : <sup>&deg;C</sup>}
          <p className="temperatiure__condition_text">
            {currWeather?.currentWeather?.current.condition.text}
          </p>
        </div>
        <img
          className="temperature__icon"
          src={currWeather?.currentWeather?.current.condition.icon}
          alt={currWeather?.currentWeather?.current.condition.text}
        />
      </div>

      <div className="temperature__location">
        <p className="temperature__location_text">
          {currWeather?.currentWeather?.location.name},<br />
          {currWeather?.currentWeather?.location.country}
        </p>
      </div>
    </div>
  );
};
