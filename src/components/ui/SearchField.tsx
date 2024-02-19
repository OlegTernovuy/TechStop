const SearchField = () => {
  return (
    <form className="flex bg-white text-TechStopBlue">
      <input
        className="icon border-[1px] border-TechStopBlue40 shadow-[0_4px_4px_0px_#00000040] rounded md:rounded-r-none h-[40px] md:h-[52px] w-[186px] xl:w-[300px] 2xl:w-[560px] px-3"
        type="text"
      />
      <button
        className="hidden md:block w-[100px] h-[40px] md:h-[52px] bg-TechStopWhite border-[1px] border-TechStopBlue40 shadow-[0_4px_4px_0px_#00000040] rounded-r"
        type="submit"
      >
        ПОШУК
      </button>
    </form>
  );
};

export default SearchField;
