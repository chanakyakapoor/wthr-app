import { createContext, useContext } from "react";
import { useCurrentWeather, WeatherProps } from "../hooks/useCurrentWeather";

const CurrWeatherContext = createContext<WeatherProps>({
  currentWeather: null,
  loading: true,
  error: undefined,
  fetchCurrentWeather: () => null,
});

export function useCurrWeather() {
  const context = useContext(CurrWeatherContext);
  if (context === undefined) {
    throw new Error("useCurrWeather must be used within a CurrWeatherProvider");
  }
  return context;
}

export function CurrWeatherProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const currWeather = useCurrentWeather();
  return (
    <CurrWeatherContext.Provider value={currWeather}>
      {children}
    </CurrWeatherContext.Provider>
  );
}
