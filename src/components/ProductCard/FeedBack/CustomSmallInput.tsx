"use client";

import React, { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { CssTextField } from "@/constants/customStyles";

interface ICustomSmallInputProps {
  name: string;
  label: string;
  placeholder?: string;
}

const CustomSmallInput: FC<ICustomSmallInputProps> = ({
  name,
  label,
  placeholder,
}) => {
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
          <CssTextField
            {...field}
            id={name}
            error={isError}
            className={`w-full min-w-[320px] ${isError ? "mb-0" : "mb-4"} `}
            style={
              isError
                ? { marginBottom: "0", minWidth: "320px" }
                : { marginBottom: "16px", minWidth: "320px" }
            }
            variant="outlined"
            placeholder={placeholder}
            label={label}
            InputProps={{ className: `${isError ? "border-transparent" : ""}` }}
          />
        )}
      />
    </>
  );
};

export default CustomSmallInput;
