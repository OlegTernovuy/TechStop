"use client";

import React, { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";

interface ICustomSmallInputProps {
  name: string;
  label: string;
}

const CustomSmallInput: FC<ICustomSmallInputProps> = ({ name, label }) => {
  const { control } = useFormContext();

  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label={label}
            className="w-1/3"
            variant="outlined"
            InputProps={{
              className: "border border-TechStopBlue",
            }}
          />
        )}
      />
    </>
  );
};

export default CustomSmallInput;
