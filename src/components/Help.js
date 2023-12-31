const Box = (props) => {
  let state = "text-black border-2 border-gray-300  dark:text-white";
  if (props.state === "C") state = "bg-green-700 text-white";
  if (props.state === "E") state = "bg-amber-500 text-white";
  if (props.state === "N") state = "bg-zinc-500 text-white dark:bg-gray-700";

  return <div className={"w-8 h-8 sm:w-10 sm:h-10 grid place-items-center p-0 m-0 font-bold text-lg sm:text-2xl " + state}>{props.value}</div>;
};

const Help = () => {
  return (
    <>
      <p className="mr-1 text-sm text-left opacity-75 sm:text-base font-regular">Guess the WORDLE in six tries.</p>
      <ul className="px-5 pt-3 mr-1 text-sm text-left list-disc opacity-75 sm:text-base font-regular">
        <li>Each guess must be a valid 5-letter word.</li>
        <li>The color of the tiles will change to show how close your guess was to the word.</li>
      </ul>

      <h3 className="py-2 font-bold text-left">Examples</h3>
      <div className="flex gap-1">
        <Box value="W" state="C" />
        <Box value="E" />
        <Box value="A" />
        <Box value="R" />
        <Box value="Y" />
      </div>
      <p className="py-2 text-sm text-left opacity-75 sm:text-base">
        The letter <strong>W</strong> is in the word and in the correct spot.
      </p>
      <div className="flex gap-1">
        <Box value="P" />
        <Box value="I" />
        <Box value="L" state="E" />
        <Box value="L" />
        <Box value="S" />
      </div>
      <p className="py-2 text-sm text-left opacity-75 sm:text-base">
        The letter <strong>L</strong> is in the word but in the wrong spot.
      </p>
      <div className="flex gap-1">
        <Box value="V" />
        <Box value="A" state="N" />
        <Box value="G" />
        <Box value="U" />
        <Box value="E" />
      </div>
      <p className="py-2 text-sm text-left opacity-75 sm:text-base">
        The letter <strong>A</strong> is not in the word in any spot.
      </p>
    </>
  );
};

export default Help;
