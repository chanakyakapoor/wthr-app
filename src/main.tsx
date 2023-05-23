import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CurrWeatherProvider } from "./contexts/currWeatherContext";
import { TemperatureContextProvider } from "./contexts/temperatureContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CurrWeatherProvider>
      <TemperatureContextProvider>
        <App />
      </TemperatureContextProvider>
    </CurrWeatherProvider>
  </React.StrictMode>
);
