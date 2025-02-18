import { useEffect, useState } from "react";
import Board from "./Board";
import Error from "./Error";
import Help from "./Help";
import KeyBoard from "./KeyBoard";
import Modal from "./Modal";
import NavBar from "./NavBar";
import { useKeyboard } from "../hooks/useKeyboard";
import { useGameContext } from "../context/GameContext";

const Game = ({ darkness }) => {
  const { letter, clicked, handleKeyPress, reset } = useKeyboard();
  const { darkMode, setDarkMode, error, setError, letters, setLetters, gameKey, resetGame } = useGameContext();
  const [help, setHelp] = useState(false);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    const onKeyDown = (event) => handleKeyPress(event.key);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleKeyPress]);

  useEffect(() => {
    darkness(darkMode);
  }, [darkness, darkMode]);

  const handleLettersUpdate = (lettersValue) => {
    setLetters(lettersValue);
    setChanged((prev) => !prev);
  };

  const handleReset = () => {
    reset();
    resetGame();
  };

  return (
    <>
      {help && (
        <Modal title="How to play!" help={setHelp}>
          <Help />
        </Modal>
      )}
      {error && <Error>{error}</Error>}
      <div>
        <NavBar help={setHelp} darkness={setDarkMode} dark={darkMode} />
        <hr />
        <Board key={gameKey} letter={letter} clicks={clicked} letters={handleLettersUpdate} error={setError} onReset={handleReset} />
        <KeyBoard keyHandler={handleKeyPress} letters={letters} changed={changed} />
      </div>
    </>
  );
};

export default Game;
