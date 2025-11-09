import "./App.css";
import Game from "./components/Game";
import { GameProvider } from "./context/GameContext";
import ErrorBoundary from "./components/ErrorBoundary";
import { useEffect } from "react";

const App = () => {
  const darkHandler = (dark) => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  };

  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    const isDark = saved !== null ? JSON.parse(saved) : true;
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <ErrorBoundary>
      <GameProvider>
        <div className={"app dark:bg-neutral-900"}>
          <Game darkness={darkHandler} />
        </div>
      </GameProvider>
    </ErrorBoundary>
  );
};

export default App;
