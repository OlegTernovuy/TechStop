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
import { IDeliveryContent, INPCity, formDat } from "@/types";
import Button from "@/components/ui/Button";
import { checkIsContact } from "../utils/CheckIsData";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { getData, getNovaPostDepartments } from "../utils/NovaPostaApi";
import { useDebounce } from "../utils/useDebounce";

import { OurShops, Posts, UkrPostDepartments } from "@/constants";

const DeliveryMethod = ({ setOrderContactData, toggle }: formDat) => {
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
    const response = await getNovaPostDepartments(DeliveryCity);
    response.data.length > 0 && setSearchPostDepartments(response.data);
  };

  // const [searchTerm, setSearchTerm] = useState("");

  // const filteredOptions = searchPostDepartments.filter((option) =>
  //   option.Description.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  useEffect(() => {
    findNovaPostDepartments("8d5a980d-391c-11dd-90d9-001a92567626");
  }, []);

  useEffect(() => {
    city.city.length === 0 ? setSearchCity([]) : findCity();
  }, [debouncedSearch]);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IDeliveryContent>({
    defaultValues: {
      postOffice: "",
      // postOfficeData: "",
      novaPostDepart: "",
      ukrPostDepart: "",
      shopDepart: "",
      courierAddress: "",
    },
    resolver: yupResolver(DeliveryValidationsSchema),
  });

  const submitFields = handleSubmit((contact) => {
    try {
      checkIsContact(city, setOrderContactData);
      checkIsContact({ ...contact }, setOrderContactData);

      // const {
      //   courierAddress,
      //   novaPostDepart,
      //   postOffice,
      //   shopDepart,
      //   ukrPostDepart,
      // } = contact;

      // const courierAddressObject = { courierAddress };
      // const novaPostDepartObject = { novaPostDepart };
      // const postOfficeObject = { postOffice };
      // const shopDepartObject = { shopDepart };
      // const ukrPostDepartObject = { ukrPostDepart };

      // checkIsContact(search, setOrderContactData);
      // checkIsContact(postOfficeObject, setOrderContactData);
      // postOffice === "Курʼєром" ?
      // checkIsContact(courierAddressObject, setOrderContactData) :
      // postOffice === "Нова Пошта" ?
      // checkIsContact(novaPostDepartObject, setOrderContactData) :
      // postOffice === "УкрПошта" ?
      // checkIsContact(ukrPostDepartObject, setOrderContactData) :
      // checkIsContact(shopDepartObject, setOrderContactData)

      toggle(2);
    } catch (error: any) {
      console.error("Error post user: ", error);
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
      <FormControl sx={{ width: "100%" }} error={!!errors?.postOffice}>
        {errors?.postOffice && (
          <FormLabel className="pb-4">Select your post office</FormLabel>
        )}
        <RadioGroup className="gap-4">
          {Posts?.map((post, i) => {
            return (
              <Controller
                control={control}
                name="postOffice"
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
                            error={!!errors?.novaPostDepart}
                          >
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
                            error={!!errors?.ukrPostDepart}
                          >
                            <InputLabel id="demo-simple-select-label">
                              Відділення
                            </InputLabel>
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
                      ) : post.id === 3 ? (
                        <div className="py-3 w-full">
                          <FormControl fullWidth error={!!errors?.shopDepart}>
                            <InputLabel id="demo-simple-select-label">
                              Магазин
                            </InputLabel>
                            <Controller
                              control={control}
                              name="shopDepart"
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
                          <FormControl fullWidth>
                            <Controller
                              control={control}
                              name="courierAddress"
                              render={({ field }) => (
                                <TextField
                                  label="Ваша адреса"
                                  variant="outlined"
                                  error={!!errors?.courierAddress}
                                  helperText={errors.courierAddress?.message}
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
