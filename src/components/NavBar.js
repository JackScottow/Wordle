import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Settings from "./Settings";

function NavBar(props) {
  return (
    <div className="flex items-center justify-between w-full py-3 pt-5 text-black navbar sm:pt-3 dark:text-white ">
      <HelpOutlineIcon
        className="cursor-pointer hover:animate-spin"
        onClick={() => {
          props.help(true);
        }}
      />
      <h1 className="font-serif text-3xl font-bold">WORDLE</h1>
      <Settings darkness={props.darkness} dark={props.dark} />
    </div>
  );
}

export default NavBar;
