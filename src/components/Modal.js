import CloseIcon from "@mui/icons-material/Close";

const Modal = (props) => {
  return (
    <div className="absolute grid w-full h-full">
      <div className="z-10 flex flex-col p-5 pb-2 bg-white place-self-center rounded-xl drop-shadow-3xl dark:bg-neutral-900 dark:text-white" style={{ width: "min(600px, 90vw)", height: "min(580px, 80vh)" }}>
        <div className="flex items-center justify-between pb-5">
          <CloseIcon className="invisible" />
          <h2 className="text-2xl font-black">{props.title}</h2>
          <CloseIcon
            className="cursor-pointer"
            onClick={() => {
              props.help(false);
            }}
          />
        </div>
        <div className="overflow-y-scroll modal overscroll-contain sm:px-7 ">{props.children}</div>
      </div>
      <div
        className="absolute z-0 grid justify-center w-full h-full"
        onClick={() => {
          props.help(false);
        }}
      />
    </div>
  );
};

export default Modal;
