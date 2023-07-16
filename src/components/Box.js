import { useEffect, useState } from "react";
import BackspaceIcon from "@mui/icons-material/Backspace";

const Box = (props) => {
  const [state, setState] = useState("text-black border-2 border-zinc-700 dark:bg-neutral-900 dark:text-white");

  useEffect(() => {
    setTimeout(
      () => {
        if (props.state === "C") setState("animate-ping text-white bg-green-700");
        if (props.state === "E") setState("animate-ping text-white bg-amber-500");
        if (props.state === "N") setState("animate-ping text-white bg-zinc-500 bg-zinc-700");
      },
      200 * (props.pos + 1)
    );

    setTimeout(
      () => {
        if (props.state === "C") setState("text-white bg-green-700");
        if (props.state === "E") setState("text-white bg-amber-500");
        if (props.state === "N") setState("text-white bg-zinc-500 bg-zinc-700");
      },
      200 * (props.pos + 1) + 75
    ); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.state]);

  return <div className={"grid place-items-center w-12 h-12 p-0 m-0 text-4xl font-bold rounded-sm sm:w-14 sm:h-14 " + state}>{props.value === "DEL" ? <BackspaceIcon /> : props.value}</div>;
};

export default Box;
