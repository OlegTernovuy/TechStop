import { useFilterStore } from "@/store/useFiltersStore";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import NoSsr from "../utils/NoSsr";
import { useRouter, useSearchParams } from "next/navigation";

interface IPropsParams {
  pathname: string;
}

const HeaderBlockProductsByCategory = ({ pathname }: IPropsParams) => {
  const parts = pathname.split("/");
  const category = parts[2];

  const { sortFilter, setSortFilter } = useFilterStore() 

  const router = useRouter();
  const searchParams = useSearchParams()

  const addQueryParams = (event: SelectChangeEvent) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set('sort', event.target.value as string);

    router.push(`/products/search/?${currentParams.toString()}`);
}

  // const [sort, setSort] = useState("популярні");

  // const handleChange = (event: SelectChangeEvent) => {
  //   setSortFilter(event.target.value as string);
  // };

  return (
    <div className="md:border-b-[1px] border-b-TechStopBlue40 px-4 md:px-4 lg:px-6 xl:px-8">
      <div className="mx-auto w-full max-w-[1712px] pt-4 pb-4 md:py-8">
        <div className="mb-6 text-body1 text-TechStopGrey">
          <Link href={"/"} className="hover:text-TechStopBronze">
            Головна
          </Link>
          / {category}
        </div>
        <div className="flex justify-between gap-4">
          <h2 className="hidden md:flex text-Headline3 text-TechStopBlue">{category}</h2>
          <div className="w-full max-w-[220px]">
            <FormControl fullWidth>
              <NoSsr>
              <Select
                value={sortFilter}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                onChange={addQueryParams}
                className="h-[42px] md:h-14 text-body1 text-TechStopBlue60"
              >
                <MenuItem value={"популярні"}>популярні</MenuItem>
                {/* <MenuItem value={"новинки"}>новинки</MenuItem> */}
                <MenuItem value={"дешеві"}>дешеві</MenuItem>
                <MenuItem value={"дорогі"}>дорогі</MenuItem>
              </Select>
              </NoSsr>
            </FormControl>
          </div>
          <button className="w-full md:hidden bg-TechStopBlue text-TechStopWhite uppercas h-[42px] md:h-[52px] flex justify-center items-center py-2 rounded">
            фільтри
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderBlockProductsByCategory;
