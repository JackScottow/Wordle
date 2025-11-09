import { createContext, useContext, useState, useEffect } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [letters, setLetters] = useState(() => {
    const letters = [];
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach((i) => {
      letters[i] = "";
    });
    return letters;
  });
  const [error, setError] = useState("");
  const [gameKey, setGameKey] = useState(0);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const resetGame = () => {
    const freshLetters = [];
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach((i) => {
      freshLetters[i] = "";
    });
    setLetters(freshLetters);
    setGameKey((prev) => prev + 1);
    setError("");
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
