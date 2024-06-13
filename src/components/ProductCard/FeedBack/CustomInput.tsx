"use client";

import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { CssTextField } from "@/constants/customStyles";

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

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <CssTextField
          {...field}
          id={name}
          error={!!errors[name]}
          className={`w-full ${errors[name] ? "mb-0" : "mb-4"}`}
          label={label}
          variant="outlined"
          multiline={multiline}
          rows={rows}
          InputProps={{
            className: `${errors[name] ? "border-transparent" : ""}`,
          }}
        />
      )}
    />
  );
};

export default CustomInput;
