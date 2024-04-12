"use client";

import { PersonalLoginInfoSchema } from "@/app/utils/ValidationsSchema";
import Button from "@/components/ui/Button";
import { IPersonalLoginInfo } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { CustomTextField } from "./PersonalContactInfo";
import { useCallback, useEffect } from "react";

const PersonalLoginInfo = () => {
  const classes = CustomTextField();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<IPersonalLoginInfo>({
    defaultValues: {
      loginPhone: "",
    },
    resolver: yupResolver(PersonalLoginInfoSchema),
  });
  const onSubmit: SubmitHandler<IPersonalLoginInfo> = useCallback((data) => {
    console.log(data);
  }, []);

  const userLogin = {
    loginPhone: "+380787765656",
  };

  useEffect(() => {
    if (userLogin) {
      reset({
        loginPhone: userLogin.loginPhone,
      });
    }
  }, [reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-Headline5 md:text-Headline4 text-TechStopBlue mb-6">
      {/* <h2 className="w-screen md:w-full text-Headline6 md:text-Headline4 text-TechStopBlue box-border p-0 ml-[-16px] md:ml-0 border-y md:border-none border-TechStopBlue60"> */}
        Логін
      </h2>
      <div className="flex flex-col lg:flex-row justify-between gap-6">
        <Controller
          control={control}
          name="loginPhone"
          render={({ field }) => (
            <TextField
              label="Логін (телефон)"
              variant="standard"
              placeholder="+38 - ( ) -   - -"
              error={!!errors?.loginPhone}
              helperText={errors.loginPhone?.message}
              onChange={(e) => field.onChange(e)}
              value={field.value}
              className={`${classes.root} w-full lg:w-80`}
            />
          )}
        />
        <Button
          stylesButton="w-full lg:w-[200px] bg-white text-TechStopBronze lg:text-TechStopBlue lg:border border-TechStopBlue60 uppercase"
          title="Зберегти"
        />
      </div>
    </form>
  );
};

export default PersonalLoginInfo;
