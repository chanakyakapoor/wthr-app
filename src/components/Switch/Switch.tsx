import { useTemperatureContext } from "../../contexts/temperatureContext";
import "./switch.css";

export const Switch = () => {
  const { mode, toggle } = useTemperatureContext();

  return (
    <div className="switch">
      {/* <button onClick={toggle}>
        Switch to {mode === "celsius" ? "F" : "C"}
      </button> */}
      <button
        onClick={() => {
          toggle();
        }}
        className="switch__toggle_btn"
      >
        °C
      </button>
      <button
        onClick={() => {
          toggle();
        }}
        className="switch__toggle_btn"
      >
        °F
      </button>
      <div
        className={`switch__indicator ${
          mode === "fahrenheit" ? "switch__on" : "switch__off"
        }`}
      ></div>
    </div>
  );
};
