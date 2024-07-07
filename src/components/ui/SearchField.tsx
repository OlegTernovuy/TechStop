import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const SearchField = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('search');
    const [search, setSearch] = useState(searchQuery);

    const onSearchSubmit = (e: any) => {
        e.preventDefault();
        router.push(`/products/search?search=${search}`);
        setSearch('');
    };

    return (
        <form
            className="flex bg-white text-TechStopBlue"
            onSubmit={onSearchSubmit}
        >
            <div className="relative">
                <input
                    className="md:border-[1px] border-TechStopBlue40 shadow-[0_4px_4px_0px_#00000040] rounded md:rounded-r-none h-[40px] md:h-[52px] w-[186px] xl:w-[300px] 2xl:w-[560px] px-3"
                    type="text"
                    value={search !== null ? search : ''}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit" className="absolute right-3 h-full">
                    <svg
                        fill="#000000"
                        height="16px"
                        width="16px"
                        version="1.1"
                        id="Capa_1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="-58.61 -58.61 605.62 605.62"
                        stroke="#000000"
                        strokeWidth="40.5372"
                    >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                            <path d="M0,203.25c0,112.1,91.2,203.2,203.2,203.2c51.6,0,98.8-19.4,134.7-51.2l129.5,129.5c2.4,2.4,5.5,3.6,8.7,3.6 s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-129.6-129.5c31.8-35.9,51.2-83,51.2-134.7c0-112.1-91.2-203.2-203.2-203.2 S0,91.15,0,203.25z M381.9,203.25c0,98.5-80.2,178.7-178.7,178.7s-178.7-80.2-178.7-178.7s80.2-178.7,178.7-178.7 S381.9,104.65,381.9,203.25z"></path>{' '}
                        </g>
                    </svg>
                </button>
            </div>
            <button className="hidden md:flex justify-center items-center w-[100px] h-[40px] md:h-[52px] bg-TechStopWhite border-[1px] border-TechStopBlue40 shadow-[0_4px_4px_0px_#00000040] rounded-r">
                ПОШУК
            </button>
        </form>
    );
};

export default SearchField;
