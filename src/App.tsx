import "./App.css";
import type { WeatherProps } from "./hooks/useCurrentWeather";
import { Topbar } from "./components/Topbar";
import { WeatherSymbol } from "./components/WeatherSymbol";
import { Temperature } from "./components/Temperature";
import { useEffect, useState } from "react";
import { useTime } from "./hooks/useTime";
import { StatsBar } from "./components/StatsBar";
import { MoreStats } from "./components/MoreStats";
import { GraphSection } from "./components/GraphSection";
import { Sidebar } from "./components/Sidebar";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isNight = useTime();

  useEffect(() => {
    if (isNight) {
      document.body.classList.add("isNight");
    } else {
      document.body.classList.remove("isNight");
    }
  }, [isNight]);

  return (
    <div className="app-wrapper">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="App">
        <Topbar setSidebarOpen={setSidebarOpen} />
        {/* Hero */}
        <div className="hero">
          <div className="hero__temperature_section">
            <WeatherSymbol />
            <Temperature />
            <StatsBar />
          </div>
          <div>
            <MoreStats />
          </div>
        </div>
        {/* Graph Section */}
        <div className="graph-section">
          <GraphSection />
        </div>
      </div>
    </div>
  );
}

export default App;
