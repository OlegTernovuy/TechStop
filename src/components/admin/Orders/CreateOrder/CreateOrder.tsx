// "use client";

import React, { FC } from "react";
import { useController, Control, FieldErrors } from "react-hook-form";
import { ICreateOrderFormValues } from "../../types";

interface CreateOrderProps {
  name: keyof ICreateOrderFormValues | string;
  label: string;
  control: Control<any>;
  errors: FieldErrors<any>;
  type?: "text" | "number" | "select";
  options?: string[];
}

const CreateOrder: FC<CreateOrderProps> = ({
  name,
  label,
  control,
  errors,
  type = "text",
  options = [],
}) => {
  const {
    field: { onChange, onBlur, value, ref },
  } = useController({
    name,
    control,
    defaultValue: "",
  });

  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div className="w-full px-2 mb-4">
      <label htmlFor={name} className="block text-gray-700">
        {label}
      </label>
      {type === "select" ? (
        <select
          id={name}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          ref={ref}
          className="w-full p-2 border text-TechStopBlue  border-gray-300 rounded"
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          type={type}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          ref={ref}
          className="w-full p-2 border text-TechStopBlue  border-gray-300 rounded"
        />
      )}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default CreateOrder;
