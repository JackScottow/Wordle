import { useEffect, useState } from "react";
import Box from "./Box";
import words from "../words";
import { useGameContext } from "../context/GameContext";

const createDefaultBoard = () => {
  const board = [];
  for (let i = 0; i < 6; i++) {
    board.push([]);
    for (let j = 0; j < 5; j++) {
      board[i].push(["", ""]);
    }
  }
  return board;
};

const createDefaultLetters = () => {
  const letters = [];
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach((i) => {
    letters[i] = "";
  });
  return letters;
};

const Board = (props) => {
  const [correct, setCorrect] = useState(() => words[Math.floor(Math.random() * words.length - 1)].toUpperCase());
  const [letters, setLetters] = useState(() => createDefaultLetters());
  const [board, setBoard] = useState(() => createDefaultBoard());
  const [changed, setChanged] = useState(false);
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const [win, setWin] = useState(false);
  const [lost, setLost] = useState(false);
  const [message, setMessage] = useState("");
  const { resetGame } = useGameContext();


  useEffect(() => {
    if (win || lost) return;

    if (props.clicks !== 0) {
      if (props.letter === "DEL") {
        setCol(col === 0 ? 0 : col - 1);
        setBoard((prevBoard) => {
          prevBoard[row][col === 0 ? 0 : col - 1][0] = "";
          return prevBoard;
        });
      } else {
        setBoard((prevBoard) => {
            if (col < 5) {
              if (props.letter !== "ENTER") {
                prevBoard[row][col][0] = props.letter;
                setCol(col + 1);
              } else {
                props.error("Words are 5 letters long!");
                setTimeout(() => {
                  props.error("");
                }, 1000);
              }
            } else {
              if (props.letter === "ENTER") {
                let correctLetters = 0;
                let word = "";
                for (let i = 0; i < 5; i++) {
                  word += prevBoard[row][i][0];
                }
                if (words.includes(word.toLowerCase())) {
                  let availableLetters = {};
                  for (let i = 0; i < 5; i++) {
                    const letter = correct[i];
                    availableLetters[letter] = (availableLetters[letter] || 0) + 1;
                  }

                  for (let i = 0; i < 5; i++) {
                    if (correct[i] === prevBoard[row][i][0]) {
                      prevBoard[row][i][1] = "C";
                      correctLetters++;
                      availableLetters[prevBoard[row][i][0]]--;
                    }
                  }

                  for (let i = 0; i < 5; i++) {
                    const guessedLetter = prevBoard[row][i][0];
                    if (prevBoard[row][i][1] !== "C") {
                      if (availableLetters[guessedLetter] && availableLetters[guessedLetter] > 0) {
                        prevBoard[row][i][1] = "E";
                        availableLetters[guessedLetter]--;
                      } else {
                        prevBoard[row][i][1] = "N";
                      }
                    }
                  }

                  for (let i = 0; i < 5; i++) {
                    setLetters((prev) => {
                      prev[board[row][i][0]] = board[row][i][1];
                      return prev;
                    });
                  }

                  setRow(row + 1);
                  if (row === 5) {
                    setLost(true);
                    setTimeout(() => {
                      setMessage(`It was ${correct}`);
                    }, 750);
                  }

                  setCol(0);
                  setChanged(!changed);

                  if (correctLetters === 5) {
                    setWin(true);
                    setTimeout(() => {
                      setMessage("You WIN");
                    }, 750);
                  }
                  return prevBoard;
                } else {
                  props.error("Word not in dictionary");
                  setTimeout(() => {
                    props.error("");
                  }, 1500);
                }
              }
            }
            return prevBoard;
        });
      }
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.clicks]);

  useEffect(() => {
    props.letters(letters); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changed]);

  return (
    <div className="grid items-center justify-center w-full px-2 py-5 gap-y-1">
      {board.map((row, key) => {
        return (
          <div key={key} className="flex w-full gap-1">
            {row.map((value, key) => (
              <Box key={key} value={value[0]} state={value[1]} pos={key} />
            ))}
          </div>
        );
      })}
      {(lost || win) && (
        <div className="flex flex-col items-center gap-2 mt-4 mb-2">
          <div className="font-bold dark:text-white">{message}</div>
          <button onClick={props.onReset} className="px-4 py-2 text-sm font-semibold text-white transition-colors bg-green-600 rounded hover:bg-green-700">
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default Board;
