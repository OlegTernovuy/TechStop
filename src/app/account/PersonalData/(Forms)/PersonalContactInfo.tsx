"use client";

import { PersonalContactInfoSchema } from "@/app/utils/ValidationsSchema";
import Button from "@/components/ui/Button";
import { IPersonalContactInfo } from "@/types";
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

const PersonalContactInfo = () => {
  const classes = CustomTextField();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<IPersonalContactInfo>({
    defaultValues: {
      name: "",
      surname: "",
      phone: "",
      email: "",
      birthdate: "",
    },
    resolver: yupResolver(PersonalContactInfoSchema),
  });

  const onSubmit: SubmitHandler<IPersonalContactInfo> = useCallback((data) => {
    console.log(data);
  }, []);

  const user = {
    name: "John",
    surname: "Trewis",
    phone: "+380875565656",
    birthdate: "23.06.2015",
    email: "james@gmail.com",
  };

  useEffect(() => {
    if (user) {
      reset({
        email: user.email,
        name: user.name,
        surname: user.surname,
        phone: user.phone,
        birthdate: user.birthdate,
      });
    }
  }, [reset]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="w-full text-Headline5 md:text-Headline4 text-TechStopBlue md:pb-2 md:pt-0">
        Контактна інформація
      </h2>
      <div className="flex flex-col lg:flex-row justify-between gap-6 pt-4">
        <div className="flex flex-col xl:flex-row gap-6">
          <div className="flex flex-col gap-6">
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <TextField
                  label="Ім'я"
                  variant="standard"
                  placeholder="Ім'я"
                  error={!!errors?.name}
                  helperText={errors.name?.message}
                  onChange={(e) => field.onChange(e)}
                  value={field.value}
                  className={`${classes.root} w-full lg:w-80`}
                />
              )}
            />
            <Controller
              control={control}
              name="phone"
              render={({ field }) => (
                <TextField
                  label="Номер телефону"
                  variant="standard"
                  placeholder="+38 - ( ) -   - -"
                  error={!!errors?.phone}
                  helperText={errors.phone?.message}
                  onChange={(e) => field.onChange(e)}
                  value={field.value}
                  className={`${classes.root} w-full lg:w-80`}
                />
              )}
            />
            <Controller
              control={control}
              name="birthdate"
              render={({ field }) => (
                <TextField
                  label="Дата народження"
                  variant="standard"
                  placeholder="Дата народження"
                  error={!!errors?.birthdate}
                  helperText={errors.birthdate?.message}
                  onChange={(e) => field.onChange(e)}
                  value={field.value}
                  className={`${classes.root} w-full lg:w-80`}
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-6">
            <Controller
              control={control}
              name="surname"
              render={({ field }) => (
                <TextField
                  label="Прізвище"
                  variant="standard"
                  placeholder="Прізвище"
                  error={!!errors?.surname}
                  helperText={errors.surname?.message}
                  onChange={(e) => field.onChange(e)}
                  value={field.value}
                  className={`${classes.root} w-full lg:w-80`}
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <TextField
                  label="Email"
                  variant="standard"
                  placeholder="Email"
                  error={!!errors?.email}
                  helperText={errors.email?.message}
                  onChange={(e) => field.onChange(e)}
                  value={field.value}
                  className={`${classes.root} w-full lg:w-80`}
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

export default PersonalContactInfo;
