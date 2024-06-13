"use client";

import { editMe } from "@/api";
import { PersonalContactInfoSchema } from "@/app/utils/ValidationsSchema";
import Button from "@/components/ui/Button";
import { IPersonalContactInfo } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
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
  const { data: session } = useSession();

  const classes = CustomTextField();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<IPersonalContactInfo>({
    defaultValues: {
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      b_day: "",
    },
    resolver: yupResolver(PersonalContactInfoSchema),
  });

  const onSubmit: SubmitHandler<IPersonalContactInfo> = async (data) => {
    if (session?.token !== undefined) {
      await editMe(session?.token, data);
    }
  };

  useEffect(() => {
    if (session !== null) {
      reset({
        email: session?.user?.email,
        first_name: session?.user?.first_name,
        last_name: session?.user?.last_name,
        phone_number: session?.user?.phone_number,
        b_day: session?.user?.b_day?.split('T')[0],
      });
    }
  }, [reset, session]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="w-full text-Headline5 md:text-Headline4 text-TechStopBlue md:pb-2 md:pt-0">
        Контактна інформація
      </h2>
      <div className="flex flex-col lg:flex-row justify-between gap-6 pt-4">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-6">
            <Controller
              control={control}
              name="first_name"
              render={({ field }) => (
                <TextField
                  label="Ім'я"
                  variant="standard"
                  placeholder="Ім'я"
                  error={!!errors?.first_name}
                  helperText={errors.first_name?.message}
                  onChange={(e) => field.onChange(e)}
                  value={field.value}
                  className={`${classes.root} w-full lg:w-80`}
                />
              )}
            />
            <Controller
              control={control}
              name="last_name"
              render={({ field }) => (
                <TextField
                  label="Прізвище"
                  variant="standard"
                  placeholder="Прізвище"
                  error={!!errors?.last_name}
                  helperText={errors.last_name?.message}
                  onChange={(e) => field.onChange(e)}
                  value={field.value}
                  className={`${classes.root} w-full lg:w-80`}
                />
              )}
            />
          </div>
          <div className="flex flex-col md:flex-row-reverse gap-6">
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
            <Controller
              control={control}
              name="phone_number"
              render={({ field }) => (
                <TextField
                  label="Номер телефону"
                  variant="standard"
                  placeholder="+38 - ( ) -   - -"
                  error={!!errors?.phone_number}
                  helperText={errors.phone_number?.message}
                  onChange={(e) => field.onChange(e)}
                  value={field.value}
                  className={`${classes.root} w-full lg:w-80`}
                />
              )}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <Controller
              control={control}
              name="b_day"
              render={({ field }) => (
                <TextField
                  label="Дата народження"
                  variant="standard"
                  placeholder="Дата народження"
                  error={!!errors?.b_day}
                  helperText={errors.b_day?.message}
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
