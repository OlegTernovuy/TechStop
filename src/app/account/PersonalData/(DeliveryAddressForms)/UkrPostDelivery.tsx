"use client";

import { getData, getNovaPostDepartments } from "@/app/utils/NovaPostaApi";
import { useDebounce } from "@/app/utils/useDebounce";
import { UkrPostNDeliveryAddressSchema } from "@/app/utils/ValidationsSchema";
import Button from "@/components/ui/Button";
import { UkrPostDepartments } from "@/constants";
import { INPCity, IUkrPostDeliveryAddress } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Image from "next/image";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

const UkrPostDelivery = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<IUkrPostDeliveryAddress>({
    defaultValues: {
      city: "",
      ukrPostDepart: "",
    },
    resolver: yupResolver(UkrPostNDeliveryAddressSchema),
  });

  const onSubmit: SubmitHandler<IUkrPostDeliveryAddress> = useCallback(
    (data) => {
      console.log(data);
    },
    []
  );

  const userUkrPostAddress = {
    city: "м. Київ, Київська обл.33",
    ukrPostDepart: "Відділення 2",
  };

  useEffect(() => {
    if (userUkrPostAddress) {
      reset({
        city: userUkrPostAddress.city,
        ukrPostDepart: userUkrPostAddress.ukrPostDepart,
      });
    }
  }, [reset]);

  const [selectedCity, setSelectedCity] = useState(false);
  const [search, setSearch] = useState("");
  const [searchCity, setSearchCity] = useState<INPCity[]>([]);
  const [city, setCity] = useState({
    city: userUkrPostAddress
      ? userUkrPostAddress.city
      : "м. Київ, Київська обл.",
  });
  const debouncedSearch = useDebounce<string>(search, 200);

  const findCity = useCallback(async () => {
    const response = await getData(debouncedSearch);
    response.data.length > 0 && setSearchCity(response.data[0].Addresses);
  }, [debouncedSearch]);

  useEffect(() => {
    city.city.length === 0 ? setSearchCity([]) : findCity();
  }, [debouncedSearch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col lg:flex-row justify-between gap-6 pt-4 items-center">
        <div className="flex flex-col lg:flex-row w-full items-center gap-4">
          <div className="w-full lg:w-7/12">
            <TextField
              label="Ваше місто"
              value={city.city}
              className="w-full "
              onClick={() => setSelectedCity(!selectedCity)}
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
                  ".css-igs3ac": {
                    border: "2px solid #02275066",
                  },
                  "&:hover": {
                    ".css-igs3ac": {
                      border: "2px solid #02275066",
                    },
                  },
                },
              }}
            />
            <div
              className={`w-full items-center mt-1 ${
                selectedCity ? "h-14" : "hidden"
              }`}
            >
              <TextField
                label="Ваше місто"
                value={search}
                className="w-full"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSearch(e.target.value)
                }
                InputProps={{
                  sx: {
                    ".css-igs3ac": {
                      border: "2px solid #02275066",
                    },
                    "&:hover": {
                      ".css-igs3ac": {
                        border: "2px solid #02275066",
                      },
                    },
                  },
                }}
              />
              {searchCity.length > 0 && (
                <Controller
                  control={control}
                  name="city"
                  render={({ field }) => (
                    <div
                      className={
                        "mt-2 border-[2px] bg-white border-TechStopBlue60 rounded max-h-44 overflow-y-auto relative z-50"
                      }
                    >
                      {searchCity.length > 0 &&
                        searchCity.map((city, i) => {
                          return (
                            <MenuItem
                              key={i}
                              value={city?.Present}
                              onClick={() => {
                                field.onChange(city?.Present);
                                setCity({ city: city?.Present });
                                setSearch("");
                                setSelectedCity(false);
                              }}
                              className="text-sm max-w-64"
                            >
                              {city?.Present}
                            </MenuItem>
                          );
                        })}
                    </div>
                  )}
                />
              )}
            </div>
          </div>
          <div className="w-full lg:w-5/12">
            <FormControl fullWidth error={!!errors?.ukrPostDepart}>
              <InputLabel>Відділення</InputLabel>
              <Controller
                control={control}
                name="ukrPostDepart"
                render={({ field }) => (
                  <Select
                    label="Відділення"
                    value={field.value}
                    defaultValue=""
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 250,
                        },
                      },
                    }}
                    fullWidth
                  >
                    {UkrPostDepartments.map((depart) => (
                      <MenuItem
                        key={depart.id}
                        value={depart.title}
                        className="text-sm md:text-base"
                      >
                        {depart.title}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </div>
        </div>
        <Button
          stylesButton="w-full lg:w-[200px] bg-white text-TechStopBronze uppercase"
          title="Зберегти"
        />
      </div>
    </form>
  );
};

export default UkrPostDelivery;
