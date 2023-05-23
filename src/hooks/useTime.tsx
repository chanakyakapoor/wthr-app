import { useEffect, useState } from "react";
import { useCurrWeather } from "../contexts/currWeatherContext";

export function useTime() {
  const [isNight, setIsNight] = useState(false);
  const { currentWeather } = useCurrWeather();

  useEffect(() => {
    let date = new Date();
    if (currentWeather) {
      date = new Date(currentWeather.location.localtime);
    }

    const hours = date.getHours();

    if (hours >= 18 || hours <= 6) {
      setIsNight(true);
    } else {
      setIsNight(false);
    }
  }, [currentWeather]);

  return isNight;
}
