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
import { useCallback, useEffect, useState } from "react";
import { getData } from "../utils/NovaPostaApi";
import { useInput } from "../utils/useInput";
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
  const [showCity, setShowCity] = useState(false);
  const [searchCity, setSearchCity] = useState<INPCity[]>([]);
  const [selectedCity, setSelectedCity] = useState({
    city: "м. Київ, Київська обл.",
  });

  const input = useInput("");

  const debouncedSearch = useDebounce<string>(input.search, 600);

  const searchPets = useCallback(async () => {
    const response = await getData(debouncedSearch);
    response.data.length > 0 && setSearchCity(response.data[0].Addresses);
  }, [debouncedSearch]);

  useEffect(() => {
    searchPets();
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
      checkIsContact(selectedCity, setOrderContactData);
      checkIsContact({ ...contact }, setOrderContactData);
      toggle(2);
    } catch (error: any) {
      console.error("Error post user: ", error);
      throw error;
    }
  });

  return (
    <form className="mb-4 flex flex-col gap-4" onSubmit={submitFields}>
      <div
        className="h-14 border-[1px] border-TechStopBlue40 w-full flex justify-between items-center px-3 rounded cursor-pointer"
        onClick={() => setShowCity(!showCity)}
      >
        <span className="text-TechStopBlue">
          {selectedCity.city !== "" ? selectedCity.city : "Ваше місто"}
        </span>
        <Image
          src={"/ArrowDropDownFilled.svg"}
          alt="ArrowDropDownFilled"
          width={24}
          height={24}
        />
      </div>
      {showCity && (
        <div className="w-full">
          <TextField
            label="Ваше місто"
            value={input.search}
            className="w-full"
            {...input}
          />

          {searchCity.length > 0 && (
            <div
              className={
                "mt-2 border-[1px] border-TechStopBlue60 rounded max-h-44 overflow-y-auto"
              }
            >
              {searchCity.length > 0 &&
                searchCity.map((city, i) => {
                  return (
                    <MenuItem
                      key={i}
                      value={city?.Present}
                      onClick={() => {
                        setSelectedCity({ city: city?.MainDescription });
                        input.setSearch("");
                        setSearchCity([]);
                        setShowCity(!showCity);
                      }}
                    >
                      {city?.Present}
                    </MenuItem>
                  );
                })}
            </div>
          )}
        </div>
      )}
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
                  <div className="h-14 w-full px-3 border-TechStopBlue40 border-[2px] rounded flex items-center">
                    <FormControlLabel
                      control={
                        <Radio
                          value={post.name}
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                          sx={{
                            color: "#022750",
                            "&.Mui-checked": {
                              color: "#022750",
                            },
                          }}
                        />
                      }
                      className="text-TechStopBlue60"
                      label={post.name}
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
