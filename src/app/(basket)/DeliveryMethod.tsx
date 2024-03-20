import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import {
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DeliveryValidationsSchema } from "../utils/ValidationsSchema";
import { IDeliveryContent, INPCity, formDat } from "@/types";
import ButtonCatalog from "@/components/ui/ButtonCatalog";
import { checkIsContact } from "../utils/CheckIsData";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { getData } from "../utils/NovaPostaApi";
import { useDebounce } from "../utils/useDebounce";
import Image from "next/image";

const Posts = [
  {
    id: 1,
    name: "Нова Пошта",
  },
  {
    id: 2,
    name: "УкрПошта",
  },
  {
    id: 3,
    name: "Самовивіз з магазину",
  },
  {
    id: 4,
    name: "Курʼєром",
  },
];

const DeliveryMethod = ({ setOrderContactData, toggle }: formDat) => {
  const [searchCity, setSearchCity] = useState<INPCity[]>([]);

  const [search, setSearch] = useState({ city: "м. Київ, Київська обл." });

  const debouncedSearch = useDebounce<string>(search.city, 200);

  const searchPets = useCallback(async () => {
    const response = await getData(debouncedSearch);
    response.data.length > 0 && setSearchCity(response.data[0].Addresses);
  }, [debouncedSearch]);

  useEffect(() => {
    search.city.length === 0
      ? setSearchCity([])
      : search.city.includes("обл")
      ? setSearchCity([])
      : searchPets();
  }, [debouncedSearch]);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IDeliveryContent>({
    defaultValues: {
      postOffice: "",
    },
    resolver: yupResolver(DeliveryValidationsSchema),
  });

  const submitFields = handleSubmit((contact) => {
    try {
      checkIsContact(search, setOrderContactData);
      checkIsContact({ ...contact }, setOrderContactData);
      toggle(2);
    } catch (error: any) {
      console.error("Error post user: ", error);
      throw error;
    }
  });

  return (
    <form className="mb-4 flex flex-col gap-4" onSubmit={submitFields}>
      <div className="w-full">
        <TextField
          label="Ваше місто"
          value={search.city}
          className="w-full border-TechStopBlue40 border-[2px] rounded"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearch({ city: e.target.value })
          }
          InputProps={{
            endAdornment: (
              <Image
                src="./ArrowDropDownFilled.svg"
                alt="ArrowDropDownFilled"
                width={24}
                height={24}
              />
            ),
            sx: {
              ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                border: "2px solid #02275066",
              },
              "&:hover": {
                ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                  border: "2px solid #02275066",
                },
              },
            },
          }}
        />

        {searchCity.length > 0 && (
          <div
            className={
              "mt-2 border-[2px] border-TechStopBlue60 rounded max-h-44 overflow-y-auto"
            }
          >
            {searchCity.length > 0 &&
              searchCity.map((city, i) => {
                return (
                  <MenuItem
                    key={i}
                    value={city?.Present}
                    onClick={() => {
                      setSearch({ city: city?.Present });
                    }}
                  >
                    {city?.Present}
                  </MenuItem>
                );
              })}
          </div>
        )}
      </div>
      <FormControl sx={{ width: "100%" }} error={!!errors?.postOffice}>
        {errors?.postOffice && (
          <FormLabel className="pb-4">Select your post office</FormLabel>
        )}
        <RadioGroup className="gap-4">
          {Posts?.map((post) => {
            return (
              <Controller
                control={control}
                name="postOffice"
                key={post.id}
                render={({ field }) => (
                  <div className="h-14 w-full px-3 border-TechStopBlue40 border-[2px] rounded flex justify-between items-center">
                    <FormControlLabel
                      control={
                        <Radio
                          value={post.name}
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                          sx={{
                            "& svg": { width: "24px", height: "24px" },
                            color: "#02275099",
                            "&.Mui-checked": {
                              color: "#02275099",
                            },
                          }}
                        />
                      }
                      className="text-TechStopBlue60"
                      label={post.name}
                    />
                    <Image
                      src="./ArrowDropDownFilled.svg"
                      alt="ArrowDropDownFilled"
                      width={24}
                      height={24}
                    />
                  </div>
                )}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
      <ButtonCatalog
        stylesButton="w-full md:w-[358px] bg-TechStopBlue text-TechStopWhite uppercase"
        title="продовжити"
      />
    </form>
  );
};

export default DeliveryMethod;
