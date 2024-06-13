"use client";

import { FC, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";

interface ICustomInputProps {
  name: string;
  label: string;
  multiline?: boolean;
  rows?: number;
}

const CustomInput: FC<ICustomInputProps> = ({
  name,
  label,
  multiline = false,
  rows = 1,
}) => {
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

  return (
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
          error={!!errors[name]}
          className={`w-full ${errors[name] ? "mb-0" : "mb-4"}`}
          label={label}
          variant="outlined"
          multiline={multiline}
          rows={rows}
          InputProps={{
            className: `${
              isFocused ? "border-transparent" : "border border-TechStopBlue60"
            } ${errors[name] ? "border-transparent" : ""}`,
          }}
        />
      )}
    />
  );
};

export default CustomInput;
