"use client";

import { HomeDeliveryAddressSchema } from "@/app/utils/ValidationsSchema";
import Button from "@/components/ui/Button";
import { IHomeDeliveryAddress, IPersonalContactInfo } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useCallback, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export const CustomTextField = makeStyles({
  root: {
    "& label": {
      color: "#022750",
    },
    "& input": {
      color: "#022750",
    },
    "& label.Mui-focused": {
      color: "#022750",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#022750",
    },
    "& .MuiInput-underline:hover": {
      borderBottomColor: "#022750",
    },
    "& .css-1eed5fa-MuiInputBase-root-MuiInput-root::before": {
      borderBottom: "1px dashed #022750",
    },
  },
});

const HomeDelivery = () => {
  const classes = CustomTextField();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<IHomeDeliveryAddress>({
    defaultValues: {
      city: "",
      street: "",
      houseNumber: "",
      appartamentNumber: "",
    },
    resolver: yupResolver(HomeDeliveryAddressSchema),
  });

  const onSubmit: SubmitHandler<IHomeDeliveryAddress> = useCallback((data) => {
    console.log(data);
  }, []);

  const userAddress = {
    city: "Kyiv",
    street: "Lorem Ipsum",
    houseNumber: "10a",
    appartamentNumber: "34",
  };

  useEffect(() => {
    if (userAddress) {
      reset({
        city: userAddress.city,
        street: userAddress.street,
        houseNumber: userAddress.houseNumber,
        appartamentNumber: userAddress.appartamentNumber,
      });
    }
  }, [reset]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col lg:flex-row justify-between gap-6 pt-4">
        <div className="flex flex-col 2xl:flex-row gap-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <Controller
              control={control}
              name="city"
              render={({ field }) => (
                <TextField
                  label="Місто"
                  variant="standard"
                  placeholder="Місто"
                  error={!!errors?.city}
                  helperText={errors.city?.message}
                  onChange={(e) => field.onChange(e)}
                  value={field.value}
                  className={`${classes.root} w-full lg:w-60`}
                />
              )}
            />
            <Controller
              control={control}
              name="street"
              render={({ field }) => (
                <TextField
                  label="Вулиця"
                  variant="standard"
                  placeholder="Вулиця"
                  error={!!errors?.street}
                  helperText={errors.street?.message}
                  onChange={(e) => field.onChange(e)}
                  value={field.value}
                  className={`${classes.root} w-full lg:w-60`}
                />
              )}
            />
          </div>
          <div className="flex gap-6">
            <Controller
              control={control}
              name="houseNumber"
              render={({ field }) => (
                <TextField
                  label="Будинок"
                  variant="standard"
                  placeholder="Будинок"
                  error={!!errors?.houseNumber}
                  helperText={errors.houseNumber?.message}
                  onChange={(e) => field.onChange(e)}
                  value={field.value}
                  className={`${classes.root} w-full lg:w-40`}
                />
              )}
            />
            <Controller
              control={control}
              name="appartamentNumber"
              render={({ field }) => (
                <TextField
                  label="Квартира"
                  variant="standard"
                  placeholder="Квартира"
                  error={!!errors?.appartamentNumber}
                  helperText={errors.appartamentNumber?.message}
                  onChange={(e) => field.onChange(e)}
                  value={field.value}
                  className={`${classes.root} w-full lg:w-40`}
                />
              )}
            />
          </div>
        </div>
        <Button
          stylesButton="w-full lg:w-[200px] bg-white text-TechStopBronze lg:text-TechStopBlue lg:border border-TechStopBlue60 uppercase"
          title="Зберегти"
        />
      </div>
    </form>
  );
};

export default HomeDelivery;
