"use client";

import { ICharacteristic } from "@/types";
import { Checkbox, FormControl } from "@mui/material";
import React, { FC } from "react";
import { Controller, useForm, useFormContext } from "react-hook-form";

interface ICheckBoxCharacteristicsProps {
  characteristics: ICharacteristic[];
  updateCharacteristics: (name: string, checked: boolean) => void;
}

const CheckBoxCharacteristics: FC<ICheckBoxCharacteristicsProps> = ({
  characteristics,
  updateCharacteristics,
}) => {
  const { control } = useFormContext();

  const handleCheckboxChange = (name: string, checked: boolean) => {
    updateCharacteristics(name, checked);
  };

  return (
    <FormControl>
      {characteristics.map(({ name, description }, idx) => (
        <div className="mb-4" key={idx}>
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <div className="flex items-center flex-row">
                <Checkbox
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);

                    handleCheckboxChange(name, e.target.checked);
                  }}
                  className="mr-2 leading-tight"
                />
                <span className="text-gray-700">{name}</span>
              </div>
            )}
          />
        </div>
      ))}
    </FormControl>
  );
};

export default CheckBoxCharacteristics;
