import { useEffect, useState } from "react";
import { useCurrWeather } from "../../contexts/currWeatherContext";
import OutsideAlerter from "../../hooks/outsideClick";
import { DebounceInput } from "react-debounce-input";
import "./sidebar.css";
import { City } from "../../hooks/useCurrentWeather";

const recommendedCities = [
  {
    id: 1,
    name: "New York",
    region: "New York",
    country: "USA",
    lat: 40.714,
    lon: -74.006,
    url: "https://www.weatherapi.com/api-explorer.aspx",
  },
  {
    id: 2,
    name: "London",
    region: "City of London",
    country: "UK",
    lat: 51.517,
    lon: -0.106,
    url: "https://www.weatherapi.com/api-explorer.aspx",
  },
  {
    id: 3,
    name: "Paris",
    region: "Ile-de-France",
    country: "France",
    lat: 48.866,
    lon: 2.333,
    url: "https://www.weatherapi.com/api-explorer.aspx",
  },
  {
    id: 4,
    name: "Tokyo",
    region: "Tokyo",
    country: "Japan",
    lat: 35.683,
    lon: 139.683,
    url: "https://www.weatherapi.com/api-explorer.aspx",
  },
];

export const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
}) => {
  const [city, setCity] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [searchedCities, setSearchedCities] = useState<City[]>([]);
  const { fetchCurrentWeather } = useCurrWeather();
  const [clickedCity, setClickedCity] = useState<City | null>(null);

  useEffect(() => {
    if (city === "") {
      setSearchedCities([]);
      return;
    }
    let abortController = new AbortController();
    setLoading(true);
    const url = `https://api.weatherapi.com/v1/search.json?${new URLSearchParams(
      {
        key: import.meta.env.VITE_WEATHER_API_KEY,
        q: city,
      }
    )}`;

    fetch(url)
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setSearchedCities(data);
          });
        } else {
          console.log("error");
          setError(res);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
    return () => {
      abortController.abort();
    };
  }, [city]);

  useEffect(() => {
    let abortController = new AbortController();

    if (clickedCity) {
      fetchCurrentWeather(abortController, clickedCity);
      setSidebarOpen(false);
    }

    return () => {
      abortController.abort();
    };
  }, [clickedCity]);

  useEffect(() => {
    return () => {
      document.removeEventListener("touchend", () => {});
    };
  }, []);

  return (
    <OutsideAlerter
      cb={() => {
        setSidebarOpen(false);
      }}
    >
      <aside
        className={`sidebar ${sidebarOpen ? "open" : ""}`}
        // left swipe
        onTouchStart={(e) => {
          const touch = e.touches[0];
          const startX = touch.clientX;
          const startY = touch.clientY;

          const handleTouchMove = (e: any) => {
            const touch = e.touches[0];
            const endX = touch.clientX;
            const endY = touch.clientY;
            const diffX = startX - endX;
            const diffY = startY - endY;
            if (Math.abs(diffX) > Math.abs(diffY)) {
              if (diffX > 0) {
                setSidebarOpen(false);
              }
            }
          };
          document.addEventListener("touchmove", handleTouchMove);
          document.addEventListener("touchend", () => {
            document.removeEventListener("touchmove", handleTouchMove);
          });
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="input-group"
            style={{
              flexGrow: 1,
            }}
          >
            <DebounceInput
              type="text"
              className=""
              placeholder="Enter City Name"
              value={city}
              debounceTimeout={1000}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
            <button disabled className="search-button">
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <desc></desc>
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M11 18l-2 -1l-6 3v-13l6 -3l6 3l6 -3v10"></path>
                <path d="M9 4v13"></path>
                <path d="M15 7v5"></path>
                <circle cx="16.5" cy="17.5" r="2.5"></circle>
                <path d="M18.5 19.5l2.5 2.5"></path>
              </svg>
            </button>
          </div>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 1024 1024"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            className="sidebar__close_btn"
            onClick={() => {
              setSidebarOpen(false);
            }}
          >
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path>
          </svg>
        </div>

        <div className="recommended">
          <h3>Search Results</h3>
          <div className="recommended__cities">
            {loading ? <p>Loading...</p> : null}

            {error ? <p>Error</p> : null}

            {searchedCities.map((city) => (
              <div
                className="recommended__city"
                key={city.id}
                onClick={() => {
                  setClickedCity(city);
                }}
              >
                <h4>{city.name}</h4>
                <p>
                  {city.region} {city.country}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* recommended section */}
        <div className="recommended">
          <h3>Popular Cities</h3>
          <div className="recommended__cities">
            {recommendedCities.map((city) => (
              <div
                className="recommended__city"
                key={city.id}
                onClick={() => {
                  setClickedCity(city);
                }}
              >
                <h4>{city.name}</h4>
                <p>
                  {city.region} {city.country}
                </p>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </OutsideAlerter>
  );
};
//
