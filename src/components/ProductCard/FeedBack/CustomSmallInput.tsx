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

  const isError = !!errors[name];

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
            error={isError}
            className={`w-full xl:min-w-[320px] ${isError ? "mb-0" : "mb-4"}`}
            style={isError ? { marginBottom: "0" } : { marginBottom: "16px" }}
            variant="outlined"
            label={label}
            InputProps={{
              className: `border border-TechStopBlue60 ${
                isError ? "border-transparent" : ""
              }`,
            }}
          />
        )}
      />
    </>
  );
};

export default CustomSmallInput;
