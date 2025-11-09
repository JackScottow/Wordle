import { useEffect, useState } from "react";
import BackspaceIcon from "@mui/icons-material/Backspace";

const keyboard = {
  line1: "QWERTYUIOP",
  line2: "ASDFGHJKL",
  line3: "ZXCVBNM",
};

const createDefaultLetters = () => {
  const letters = [];
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach((i) => {
    letters[i] = "";
  });
  return letters;
};

const Key = (props) => {
  const [state, setState] = useState("bg-gray-200 hover:bg-zinc-300 dark:bg-neutral-500 dark:text-white dark:hover:bg-neutral-700");

  const x = props.value.length === 1 ? "text-xl w-8 sm:w-10 " : "p-2 sm:p-4 ";
  const returnKey = () => {
    props.getKey(props.value);
  };

  useEffect(() => {
    if (props.state === "") {
      setState("bg-gray-200 hover:bg-zinc-300 dark:bg-neutral-500 dark:text-white dark:hover:bg-neutral-700");
    } else {
      setTimeout(() => {
        if (props.state === "C") setState("text-white bg-green-700");
        if (props.state === "E") setState("text-white bg-amber-500");
        if (props.state === "N") setState("text-white bg-zinc-500 bg-zinc-700");
      }, 1075);
    }
  }, [props.state]);

  return (
    <button className={x + state + " grid items-center font-bold rounded cursor-pointer h-14 300"} onClick={returnKey}>
      {props.value === "DEL" ? <BackspaceIcon /> : props.value}
    </button>
  );
};

const KeyBoard = (props) => {
  const [letters, setletters] = useState(() => createDefaultLetters());
  useEffect(() => {
    setletters(props.letters);
  }, [props.letters, props.changed]);

  const keyHandler = (value) => {
    props.keyHandler(value);
  };
  return (
    <div className="flex flex-col items-center w-full pb-5">
      <div className="flex gap-1 my-0.5 w-fit">
        {keyboard.line1.split("").map((value, key) => (
          <Key getKey={keyHandler} value={value} key={key} state={letters[value]} />
        ))}
      </div>
      <div className="flex gap-1 my-0.5 w-fit">
        {keyboard.line2.split("").map((value, key) => (
          <Key getKey={keyHandler} value={value} key={key} state={letters[value]} />
        ))}
      </div>
      <div className="flex gap-1 my-0.5 w-fit">
        <Key value="ENTER" getKey={keyHandler} />
        {keyboard.line3.split("").map((value, key) => (
          <Key getKey={keyHandler} value={value} key={key} state={letters[value]} />
        ))}
        <Key value="DEL" getKey={keyHandler} />
      </div>
    </div>
  );
};

export default KeyBoard;
