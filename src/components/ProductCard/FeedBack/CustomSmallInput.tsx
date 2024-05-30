"use client";

import React, { FC, useState } from "react";
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
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

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
            onFocus={handleFocus}
            onBlur={handleBlur}
            error={isError}
            className={`w-full min-w-[320px] ${isError ? "mb-0" : "mb-4"} `}
            style={isError ? { marginBottom: "0" } : { marginBottom: "16px" }}
            variant="outlined"
            label={label}
            InputProps={{
              className: `${
                isFocused
                  ? "border-transparent"
                  : "border border-TechStopBlue60"
              } ${isError ? "border-transparent" : ""}`,
            }}
          />
        )}
      />
    </>
  );
};

export default CustomSmallInput;
