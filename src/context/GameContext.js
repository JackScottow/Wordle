import { createContext, useContext, useState } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [letters, setLetters] = useState({});
  const [error, setError] = useState("");

  const value = {
    darkMode,
    setDarkMode,
    letters,
    setLetters,
    error,
    setError,
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
