import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import {
  FormControlLabel,
  FormLabel,
  InputLabel,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DeliveryValidationsSchema } from "../utils/ValidationsSchema";
import { IDeliveryContent, INPCity, formDat, formDatAddress } from "@/types";
import Button from "@/components/ui/Button";
import { checkIsContact } from "../utils/CheckIsData";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { getData, getNovaPostDepartments } from "../utils/NovaPostaApi";
import { useDebounce } from "../utils/useDebounce";

import { OurShops, Posts, UkrPostDepartments } from "@/constants";
import { useSession } from "next-auth/react";

const DeliveryMethod = ({
  setOrderContactData,
  setCourierAddress,
  toggle,
}: formDatAddress) => {
  const { data: session } = useSession();

  const [selected, setSelected] = useState(null);
  const [selectedCity, setSelectedCity] = useState(false);
  const [search, setSearch] = useState("");

  const PostToggle = (i: any) => {
    if (i === selected) {
      return setSelected(null);
    }
    return setSelected(i);
  };

  const [searchCity, setSearchCity] = useState<INPCity[]>([]);
  const [searchPostDepartments, setSearchPostDepartments] = useState<any[]>([]);

  const [city, setCity] = useState({ city: "м. Київ, Київська обл." });

  const debouncedSearch = useDebounce<string>(search, 200);

  const findCity = useCallback(async () => {
    const response = await getData(debouncedSearch);
    response.data.length > 0 && setSearchCity(response.data[0].Addresses);
  }, [debouncedSearch]);

  const findNovaPostDepartments = async (DeliveryCity: string) => {
    console.log(DeliveryCity);
    
    const response = await getNovaPostDepartments(DeliveryCity);

    response.data.length > 0 && setSearchPostDepartments(response.data);
  };

  useEffect(() => {
    findNovaPostDepartments("8d5a980d-391c-11dd-90d9-001a92567626");
  }, []);

  useEffect(() => {
    city.city.length === 0 ? setSearchCity([]) : findCity();
  }, [debouncedSearch, city.city.length, findCity]);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IDeliveryContent>({
    defaultValues: {
      postalOperator: "",
      postalDepartment: "",
      courierAddress: {
        street: "",
        house: "",
        // apartment: ,
      },
    },
    resolver: yupResolver(DeliveryValidationsSchema),
  });

  useEffect(() => {
    if (session !== null && session?.user?.address?.city !== undefined) {
      reset({
        postalOperator: session?.user?.address?.postalOperator,
        postalDepartment: session?.user?.address?.postalDepartment,
        courierAddress: {
          street: session?.user?.address?.personalAddress?.street,
          house: session?.user?.address?.personalAddress?.house,
          apartment: session?.user?.address?.personalAddress?.apartament,
        },
      });
      setCity({ city: session.user.address.city });
    }
  }, [reset, session]);

  const submitFields = handleSubmit((contact) => {
    try {
      checkIsContact(city, setOrderContactData);
      checkIsContact(
        { postalOperator: contact.postalOperator },
        setOrderContactData
      );
      checkIsContact(
        { postalDepartment: contact.postalDepartment },
        setOrderContactData
      );
      if (
        contact.courierAddress?.street !== "" ||
        contact.courierAddress?.house !== undefined
      ) {
        setCourierAddress({
          street: contact.courierAddress?.street,
          house: contact.courierAddress?.house,
          apartment: contact.courierAddress?.apartment,
        });
      }
      toggle(2);
    } catch (error: any) {
      console.error("Error: ", error);
      throw error;
    }
  });

  return (
    <form className="mb-4 flex flex-col gap-4" onSubmit={submitFields}>
      <div
        className={`w-full px-3 border-TechStopBlue40 border-[2px] rounded items-center ${
          selectedCity ? "h-auto" : "h-14"
        }`}
      >
        <div className="flex justify-between h-full w-full">
          <FormControlLabel
            control={
              <Radio
                value={city.city}
                onClick={() => setSelectedCity(!selectedCity)}
                sx={{
                  "& svg": { width: "24px", height: "24px" },
                  color: "#02275099",
                  "&.Mui-checked": {
                    color: "#02275099",
                  },
                }}
              />
            }
            className="text-TechStopBlue60 w-full"
            label={city.city}
          />
        </div>
        <div
          className={`w-full items-center mt-1 mb-3 ${
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
            <div
              className={
                "mt-2 border-[2px] bg-white text-TechStopBlue border-TechStopBlue60 rounded max-h-44 overflow-y-auto relative z-50"
              }
            >
              {searchCity.length > 0 &&
                searchCity.map((city, i) => {                  
                  return (
                    <MenuItem
                      key={i}
                      value={city?.Present}
                      onClick={() => {
                        setCity({ city: city?.Present });
                        findNovaPostDepartments(city?.DeliveryCity);
                        setSearch("");
                        setSelectedCity(false);
                      }}
                      className="text-sm md:text-base"
                    >
                      {city?.Present}
                    </MenuItem>
                  );
                })}
            </div>
          )}
        </div>
      </div>
      <FormControl sx={{ width: "100%" }} error={!!errors?.postalOperator}>
        {errors?.postalOperator && (
          <FormLabel className="pb-4">Select your post office</FormLabel>
        )}
        <RadioGroup className="gap-4">
          {Posts?.map((post, i) => {
            return (
              <Controller
                control={control}
                name="postalOperator"
                key={post.id}
                render={({ field }) => (
                  <div
                    className={`w-full px-3 border-TechStopBlue40 border-[2px] rounded items-center ${
                      selected === i ? "h-auto" : "h-14"
                    }`}
                  >
                    <div className="flex justify-between h-full w-full">
                      <FormControlLabel
                        control={
                          <Radio
                            value={post.name}
                            onChange={(e) => {
                              field.onChange(e);
                            }}
                            onClick={() => PostToggle(i)}
                            sx={{
                              "& svg": { width: "24px", height: "24px" },
                              color: "#02275099",
                              "&.Mui-checked": {
                                color: "#02275099",
                              },
                            }}
                          />
                        }
                        className="text-TechStopBlue60 w-full"
                        label={post.name}
                      />
                    </div>
                    <div className={selected === i ? "flex" : "hidden"}>
                      {post.id === 1 ? (
                        <div className="py-3 w-full">
                          <FormControl
                            fullWidth
                            error={!!errors?.postalDepartment}
                          >
                            <InputLabel>Відділення</InputLabel>
                            <Controller
                              control={control}
                              name="postalDepartment"
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
                                      className="text-sm md:text-base"
                                    >
                                      {depart.Description}
                                    </MenuItem>
                                  ))}
                                </Select>
                              )}
                            />
                          </FormControl>
                        </div>
                      ) : post.id === 2 ? (
                        <div className="py-3 w-full">
                          <FormControl
                            fullWidth
                            error={!!errors?.postalDepartment}
                          >
                            <InputLabel id="demo-simple-select-label">
                              Відділення
                            </InputLabel>
                            <Controller
                              control={control}
                              name="postalDepartment"
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
                      ) : post.id === 3 ? (
                        <div className="py-3 w-full">
                          <FormControl
                            fullWidth
                            error={!!errors?.postalDepartment}
                          >
                            <InputLabel id="demo-simple-select-label">
                              Магазин
                            </InputLabel>
                            <Controller
                              control={control}
                              name="postalDepartment"
                              render={({ field }) => (
                                <Select
                                  label="Магазин"
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
                                  {OurShops.map((depart) => (
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
                      ) : (
                        <div className="w-full py-3">
                          <FormControl className="flex flex-row gap-6">
                            <Controller
                              control={control}
                              name="courierAddress.street"
                              render={({ field }) => (
                                <TextField
                                  label="Street"
                                  variant="outlined"
                                  error={!!errors?.courierAddress?.street}
                                  helperText={
                                    errors.courierAddress?.street?.message
                                  }
                                  onChange={(e) => field.onChange(e)}
                                  value={field.value}
                                  className="w-full"
                                  sx={{
                                    "& label": {
                                      color: "#02275099",
                                    },
                                    "& .MuiOutlinedInput-root": {
                                      "& fieldset": {
                                        borderColor: "#02275099",
                                      },
                                    },
                                  }}
                                />
                              )}
                            />
                            <Controller
                              control={control}
                              name="courierAddress.house"
                              render={({ field }) => (
                                <TextField
                                  label="HouseNumber"
                                  variant="outlined"
                                  error={!!errors?.courierAddress?.house}
                                  helperText={
                                    errors.courierAddress?.house?.message
                                  }
                                  onChange={(e) => field.onChange(e)}
                                  value={field.value}
                                  className="w-full"
                                  sx={{
                                    "& label": {
                                      color: "#02275099",
                                    },
                                    "& .MuiOutlinedInput-root": {
                                      "& fieldset": {
                                        borderColor: "#02275099",
                                      },
                                    },
                                  }}
                                />
                              )}
                            />
                            <Controller
                              control={control}
                              name="courierAddress.apartment"
                              render={({ field }) => (
                                <TextField
                                  label="ApartmentNumber"
                                  variant="outlined"
                                  error={
                                    !!errors?.courierAddress?.apartment
                                  }
                                  helperText={
                                    errors.courierAddress?.apartment
                                      ?.message
                                  }
                                  onChange={(e) => field.onChange(e)}
                                  value={field.value}
                                  className="w-full"
                                  sx={{
                                    "& label": {
                                      color: "#02275099",
                                    },
                                    "& .MuiOutlinedInput-root": {
                                      "& fieldset": {
                                        borderColor: "#02275099",
                                      },
                                    },
                                  }}
                                />
                              )}
                            />
                          </FormControl>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
      <Button
        stylesButton="w-full md:w-[358px] bg-TechStopBlue text-TechStopWhite uppercase"
        title="продовжити"
      />
    </form>
  );
};

export default DeliveryMethod;
