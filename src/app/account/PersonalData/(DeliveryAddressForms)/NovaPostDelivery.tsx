"use client";

import { getData, getNovaPostDepartments } from "@/app/utils/NovaPostaApi";
import { useDebounce } from "@/app/utils/useDebounce";
import { NovaPostNDeliveryAddressSchema } from "@/app/utils/ValidationsSchema";
import Button from "@/components/ui/Button";
import { INovaPostDeliveryAddress, INPCity } from "@/types";
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

const NovaPostDelivery = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<INovaPostDeliveryAddress>({
    defaultValues: {
      city: "",
      novaPostDepart: "",
    },
    resolver: yupResolver(NovaPostNDeliveryAddressSchema),
  });

  const onSubmit: SubmitHandler<INovaPostDeliveryAddress> = useCallback(
    (data) => {
      console.log(data);
    },
    []
  );

  const userNovaPostAddress = {
    city: "м. Київ, Київська обл.33",
    novaPostDepart:
      "Відділення №3 (до 30 кг на одне місце): вул. Слобожанська,13",
  };

  const [selectedCity, setSelectedCity] = useState(false);
  const [search, setSearch] = useState("");
  const [searchCity, setSearchCity] = useState<INPCity[]>([]);
  const [city, setCity] = useState({
    city: userNovaPostAddress
      ? userNovaPostAddress.city
      : "м. Київ, Київська обл.",
  });
  const [searchPostDepartments, setSearchPostDepartments] = useState<any[]>([]);
  const debouncedSearch = useDebounce<string>(search, 200);

  const findCity = useCallback(async () => {
    const response = await getData(debouncedSearch);
    response.data.length > 0 && setSearchCity(response.data[0].Addresses);
  }, [debouncedSearch]);

  const findNovaPostDepartments = async (DeliveryCity: string) => {
    const response = await getNovaPostDepartments(DeliveryCity);
    response.data.length > 0 && setSearchPostDepartments(response.data);
  };

  useEffect(() => {
    findNovaPostDepartments("8d5a980d-391c-11dd-90d9-001a92567626");
  }, []);

  useEffect(() => {
    city.city.length === 0 ? setSearchCity([]) : findCity();
  }, [debouncedSearch]);

  useEffect(() => {
    if (userNovaPostAddress) {
      reset({
        city: userNovaPostAddress.city,
        novaPostDepart: userNovaPostAddress.novaPostDepart,
      });
    }
  }, [reset]);
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
                                findNovaPostDepartments(city?.DeliveryCity);
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
            <FormControl fullWidth error={!!errors?.novaPostDepart}>
              <InputLabel>Відділення</InputLabel>
              <Controller
                control={control}
                name="novaPostDepart"
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
                    {searchPostDepartments.map((depart) => (
                      <MenuItem
                        key={depart.Ref}
                        value={depart.Description}
                        className="text-sm max-w-64"
                      >
                        {depart.Description}
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

export default NovaPostDelivery;
