import "./graphsection.css";
import { useEffect, useMemo, useState } from "react";
import { Line, LineChart, XAxis, CartesianGrid, Tooltip } from "recharts";
import { useCurrWeather } from "../../contexts/currWeatherContext";
import { useTemperatureContext } from "../../contexts/temperatureContext";
import { useTime } from "../../hooks/useTime";

const fractionLarge = 0.9;
const fractionSmall = 0.9;

export const GraphSection = () => {
  const { currentWeather } = useCurrWeather();
  const [width, setWidth] = useState(window.innerWidth * fractionLarge);
  const { mode } = useTemperatureContext();
  const isNight = useTime();

  const [selectedKey, setSelectedKey] = useState<
    "temp" | "precipitation" | "wind"
  >("temp");

  const handleResize = () => {
    if (window.innerWidth < 600) {
      setWidth(window.innerWidth * fractionSmall);
    } else {
      setWidth(window.innerWidth * fractionLarge);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const data = useMemo(() => {
    return (
      currentWeather?.forecast.forecastday &&
      currentWeather?.forecast.forecastday[0].hour
        ?.map((hour, index) => {
          if (index % 3 !== 0) return null;
          let date = new Date(Number(hour.time_epoch * 1000));
          return {
            time: `${date.getHours()}:00`,
            temp: mode === "celsius" ? hour.temp_c : hour.temp_f,
            precipitation: hour.chance_of_rain,
            wind: hour.wind_kph,
          };
        })
        .filter((hour) => hour !== null)
    );
  }, [currentWeather, mode]);

  return (
    <div className="graph-section__graph">
      <div className="graph-section__mode_selector">
        <h2
          onClick={() => {
            setSelectedKey("temp");
          }}
          className={selectedKey === "temp" ? "graph-section__selected" : ""}
        >
          Temperature
        </h2>
        <h2
          onClick={() => {
            setSelectedKey("precipitation");
          }}
          className={
            selectedKey === "precipitation" ? "graph-section__selected" : ""
          }
        >
          Precipitation
        </h2>
        <h2
          onClick={() => {
            setSelectedKey("wind");
          }}
          className={selectedKey === "wind" ? "graph-section__selected" : ""}
        >
          Wind
        </h2>
      </div>

      <LineChart
        width={width}
        height={300}
        data={data as any[]}
        style={{
          margin: "auto",
        }}
      >
        <Line
          dataKey={selectedKey}
          stroke={isNight ? "#ffffff" : "#f87171"}
          strokeWidth={3}
          r={1}
          label={{
            position: "top",
            offset: 10,
            fontWeight: "bold",
            fontSize: 12,
            fill: isNight ? "#ffffff" : "#451200",
            formatter: (value: number) => {
              if (selectedKey === "temp") {
                return mode === "celsius" ? `${value}°C` : `${value}°F`;
              } else if (selectedKey === "precipitation") {
                return `${value}%`;
              } else {
                return `${value} kph`;
              }
            },
            // stop label from getting cut off
          }}
        />
        <XAxis
          dataKey="time"
          stroke={isNight ? "#ffffffAA" : "#451200AA"}
          axisLine={false}
        />
        <CartesianGrid
          stroke={isNight ? "#ffffff22" : "#451200AA"}
          strokeDasharray="5 5"
        />
        <Tooltip />
      </LineChart>
    </div>
  );
};
