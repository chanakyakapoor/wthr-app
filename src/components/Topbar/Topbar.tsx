import { Switch } from "../Switch/Switch";
import "./topbar.css";

export const Topbar = ({
  setSidebarOpen,
}: {
  setSidebarOpen: (value: boolean) => void;
}) => {
  return (
    <header>
      <nav className="topbar__nav">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            placeItems: "center",
            gap: "0.5rem",
          }}
          onClick={() => {
            setSidebarOpen(true);
          }}
        >
          <button className="topbar__nav_search_button">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                strokeMiterlimit="10"
                strokeWidth="32"
                d="M256 80a176 176 0 10176 176A176 176 0 00256 80z"
              ></path>
              <path
                fill="none"
                strokeMiterlimit="10"
                strokeWidth="32"
                d="M232 160a72 72 0 1072 72 72 72 0 00-72-72z"
              ></path>
              <path
                fill="none"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="32"
                d="M283.64 283.64L336 336"
              ></path>
            </svg>
          </button>
        </div>
        <Switch />
      </nav>
    </header>
  );
};
