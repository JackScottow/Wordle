import { createContext, useContext, useState } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [letters, setLetters] = useState({});
  const [error, setError] = useState("");
  const [gameKey, setGameKey] = useState(0);

  const resetGame = () => {
    setGameKey((prev) => prev + 1);
    setLetters({});
    setError("");
    // Force a new random word by reloading the Board component
    window.location.reload();
  };

  const value = {
    darkMode,
    setDarkMode,
    letters,
    setLetters,
    error,
    setError,
    resetGame,
    gameKey,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};
