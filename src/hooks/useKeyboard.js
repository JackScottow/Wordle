import { useState, useCallback } from "react";

export const useKeyboard = () => {
  const [letter, setLetter] = useState("");
  const [clicked, setClicked] = useState(0);

  const handleKeyPress = useCallback((key) => {
    // Convert physical keyboard input to match on-screen keyboard
    const keyInput = key === "Enter" ? "ENTER" : key === "Backspace" ? "DEL" : key.toUpperCase();

    // Now handle both physical and on-screen keyboard inputs
    if (keyInput === "ENTER" || keyInput === "DEL") {
      setLetter(keyInput);
      setClicked((prev) => prev + 1);
    } else if (/^[A-Z]$/.test(keyInput)) {
      setLetter(keyInput);
      setClicked((prev) => prev + 1);
    }
  }, []);

  return {
    letter,
    clicked,
    handleKeyPress,
  };
};
