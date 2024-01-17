const SearchField = () => {
  return (
    <form className="flex bg-white rounded">
      <input
        className=" icon rounded w-[186px] h-[40px] xl:w-[300px] xl:h-[52px] 2xl:w-[560px] px-3"
        type="text"
      />
      <button
        className=" hidden md:block w-[100px] h-[40px] xl:h-[52px] bg-deWiseMain  rounded-r"
        type="submit"
      >
        ПОШУК
      </button>
    </form>
  );
};

export default SearchField;
