import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const SearchField = () => {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('search')
  const [search, setSearch] = useState(searchQuery)
  return (
    <form className="flex bg-white text-TechStopBlue">
      <input
        className="icon md:border-[1px] border-TechStopBlue40 shadow-[0_4px_4px_0px_#00000040] rounded md:rounded-r-none h-[40px] md:h-[52px] w-[186px] xl:w-[300px] 2xl:w-[560px] px-3"
        type="text"
        value={search !== null ? search : ''}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Link
        className="hidden md:flex justify-center items-center w-[100px] h-[40px] md:h-[52px] bg-TechStopWhite border-[1px] border-TechStopBlue40 shadow-[0_4px_4px_0px_#00000040] rounded-r"
        href={`/products/search?search=${search}`}
      >
        ПОШУК
      </Link>
    </form>
  );
};

export default SearchField;
