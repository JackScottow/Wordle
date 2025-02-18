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
    document.documentElement.classList.add("dark");
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
