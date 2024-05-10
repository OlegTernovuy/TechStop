"use client";

import React, { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";

interface ICustomSmallInputProps {
  name: string;
  label: string;
}

const CustomSmallInput: FC<ICustomSmallInputProps> = ({ name, label }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            id={name}
            error={!!errors[name]}
            className={`w-full xl:min-w-[320px] ${
              errors[name] ? "mb-0" : "mb-4"
            }`}
            variant="outlined"
            label={label}
            InputProps={{
              className: `border border-TechStopBlue60 ${
                errors[name] ? "border-transparent" : ""
              }`,
            }}
          />
        )}
      />
    </>
  );
};

export default CustomSmallInput;
