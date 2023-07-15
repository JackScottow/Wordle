function Error(props) {
  return (
    <div className="absolute grid w-full top-20 place-items-center">
      <div className="px-8 py-2 text-center text-white bg-gray-900 rounded-md w-fit dark:bg-slate-50 dark:text-slate-950">{props.children}</div>
    </div>
  );
}

export default Error;
