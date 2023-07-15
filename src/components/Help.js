function Box(props) {
  let state = "text-black border-2 border-gray-300  dark:text-white";
  if (props.state === "C") state = "bg-green-700 text-white";
  if (props.state === "E") state = "bg-amber-500 text-white";
  if (props.state === "N") state = "bg-zinc-500 text-white dark:bg-gray-700";

  return <div className={"w-8 h-8 sm:w-10 sm:h-10 grid place-items-center p-0 m-0 font-bold text-lg sm:text-2xl " + state}>{props.value}</div>;
}

function Help() {
  return (
    <>
      <p className="mr-1 text-sm text-left opacity-75 sm:text-base font-regular">Guess the WORDLE in six tries.</p>
      <ul className="px-5 pt-3 mr-1 text-sm text-left list-disc opacity-75 sm:text-base font-regular">
        <li>Each guess must be a valid five-letter word. Hit the enter button to submit.</li>
        <li>After each guess, the color of the tiles will change to show how close your guess was to the word.</li>
      </ul>

      <h3 className="py-2 font-bold text-left">Examples</h3>
      <div className="flex gap-1">
        <Box value="S" state="C" />
        <Box value="W" />
        <Box value="E" />
        <Box value="A" />
        <Box value="T" />
      </div>
      <p className="py-2 text-sm text-left opacity-75 sm:text-base">
        The letter <strong>S</strong> is in the word and in the correct spot.
      </p>
      <div className="flex gap-1">
        <Box value="N" />
        <Box value="U" />
        <Box value="M" state="E" />
        <Box value="B" />
        <Box value="S" />
      </div>
      <p className="py-2 text-sm text-left opacity-75 sm:text-base">
        The letter <strong>M</strong> is in the word and in the correct spot.
      </p>
      <div className="flex gap-1">
        <Box value="F" />
        <Box value="L" state="N" />
        <Box value="A" />
        <Box value="T" />
        <Box value="S" />
      </div>
      <p className="py-2 text-sm text-left opacity-75 sm:text-base">
        The letter <strong>N</strong> is in the word and in the correct spot.
      </p>
    </>
  );
}

export default Help;
