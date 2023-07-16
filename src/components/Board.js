import { useEffect, useState } from "react";
import Box from "./Box";
import words from "../words";

const Board = (props) => {
  const [letters, setLetters] = useState({});
  const [board, setBoard] = useState([]);
  const [changed, setChanged] = useState(false);
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const [win, setWin] = useState(false);
  const [lost, setLost] = useState(false);
  const [message, setMessage] = useState("");

  const correct = words[Math.floor(Math.random() * words.length - 1)].toUpperCase();

  useEffect(() => {
    const defaultLetters = {};
    "abcdefghijklmnopqrstuvwxyz".split("").forEach((i) => {
      defaultLetters[i] = "";
    });

    const defaultBoard = Array.from({ length: 6 }, () => Array.from({ length: 5 }, () => ["", ""]));

    setLetters(defaultLetters);
    setBoard(defaultBoard);
  }, []);

  useEffect(() => {
    if (win || lost) {
      console.log("Game ended!");
    } else {
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
                  for (let i = 0; i < 5; i++) {
                    if (correct[i] === prevBoard[row][i][0]) {
                      prevBoard[row][i][1] = "C";
                      correctLetters++;
                    } else if (correct.includes(prevBoard[row][i][0])) prevBoard[row][i][1] = "E";
                    else prevBoard[row][i][1] = "N";
                    setRow(row + 1);
                    if (row === 5) {
                      setLost(true);
                      setTimeout(() => {
                        setMessage(`It was ${correct}`);
                      }, 750);
                    }

                    setCol(0);
                    setLetters((prev) => {
                      prev[board[row][i][0]] = board[row][i][1];
                      return prev;
                    });
                  }
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
      <div className="grid h-8 font-bold place-items-center dark:text-white">{lost || win ? message : ""}</div>
    </div>
  );
};

export default Board;
