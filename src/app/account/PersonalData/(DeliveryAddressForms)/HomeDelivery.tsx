"use client";

import { editMe } from "@/api";
import { HomeDeliveryAddressSchema } from "@/app/utils/ValidationsSchema";
import Button from "@/components/ui/Button";
import { IHomeDeliveryAddress, IPersonalContactInfo } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSession } from "next-auth/react";
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
  const { data: session } = useSession();  

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
      house: "",
      apartament: 0,
    },
    resolver: yupResolver(HomeDeliveryAddressSchema),
  });

  const onSubmit: SubmitHandler<IHomeDeliveryAddress> = async (data) => {
    const address = {
      address: {
        city: data.city,
        personalAddress: {
          street: data.street,
          house: data.house,
          apartament: data.apartament,
        },
      },
    };
    if (session?.token !== undefined) {
      await editMe(session?.token, address);
    }
  };

  useEffect(() => {    
    if (session !== null) {      
      reset({
        city: session?.user?.address?.city,
        street: session?.user?.address?.personalAddress?.street,
        house: session?.user?.address?.personalAddress?.house,
        apartament: session?.user?.address?.personalAddress?.apartament,
      });
    }
  }, [reset, session]);

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
              name="house"
              render={({ field }) => (
                <TextField
                  label="Будинок"
                  variant="standard"
                  placeholder="Будинок"
                  error={!!errors?.house}
                  helperText={errors.house?.message}
                  onChange={(e) => field.onChange(e)}
                  value={field.value}
                  className={`${classes.root} w-full lg:w-40`}
                />
              )}
            />
            <Controller
              control={control}
              name="apartament"
              render={({ field }) => (
                <TextField
                  label="Квартира"
                  variant="standard"
                  placeholder="Квартира"
                  error={!!errors?.apartament}
                  helperText={errors.apartament?.message}
                  onChange={(e) => field.onChange(e)}
                  value={field.value}
                  className={`${classes.root} w-full lg:w-40`}
                />
              )}
            />
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

export default HomeDelivery;
