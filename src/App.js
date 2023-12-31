import "./App.css";
import Game from "./components/Game";

const App = () => {
  const darkHandler = (dark) => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  };

  return (
    <div className={"app dark:bg-neutral-900"}>
      <Game darkness={darkHandler} />
    </div>
  );
};

export default App;
