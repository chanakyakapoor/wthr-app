import React, { useMemo } from "react";
import { useCurrWeather } from "../../contexts/currWeatherContext";
import "./statsbar.css";

export const StatsBar = () => {
  const currWeather = useCurrWeather();

  const stats = useMemo(() => {
    return [
      [
        "Precipitation".toLocaleUpperCase(),
        currWeather?.currentWeather?.forecast?.forecastday?.length
          ? currWeather?.currentWeather?.forecast?.forecastday[0].day.daily_will_it_rain
              .toString()
              .concat("%")
          : "--",
      ],
      [
        "Humidity".toLocaleUpperCase(),
        currWeather.currentWeather?.current.humidity.toString().concat("%") ??
          "--",
      ],
      [
        "Wind".toLocaleUpperCase(),
        currWeather.currentWeather?.current.wind_kph
          .toString()
          .concat(" kph") ?? "--",
      ],
    ];
  }, [currWeather]);

  return (
    <div className="statsbar">
      {stats.map((stat, index) => (
        <React.Fragment key={stat[0]}>
          <div className="stat">
            <div className="stat__title">{stat[0]}</div>
            <div className="stat__value">{stat[1]}</div>
          </div>
          {/* {index !== stats.length - 1 && <div className="stat__divider" />} */}
        </React.Fragment>
      ))}
    </div>
  );
};
