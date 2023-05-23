import { createContext, useContext, useEffect, useState } from "react";

type temperatureMode = "celsius" | "fahrenheit";
interface TemperatureContextProps {
  mode: temperatureMode;
  toggle: () => void;
}

const TemperatureContext = createContext<TemperatureContextProps>({
  mode: "celsius",
  toggle: () => {},
});

export function useTemperatureContext() {
  return useContext(TemperatureContext);
}

export function TemperatureContextProvider(props: any) {
  const [mode, setMode] = useState<temperatureMode>("celsius");

  useEffect(() => {
    // load mode from local storage
    const mode = localStorage.getItem("mode");

    if (mode) {
      setMode(mode as temperatureMode);
    }

    // save mode to local storage
    localStorage.setItem("mode", mode ?? "celsius");
  }, []);

  const toggleMode = () => {
    const newMode = mode === "celsius" ? "fahrenheit" : "celsius";
    setMode(newMode);
    localStorage.setItem("mode", newMode);
  };

  return (
    <TemperatureContext.Provider value={{ mode: mode, toggle: toggleMode }}>
      {props.children}
    </TemperatureContext.Provider>
  );
}
