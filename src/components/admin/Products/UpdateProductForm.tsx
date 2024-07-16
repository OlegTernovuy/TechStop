"use client";

import React, { FC, useState } from "react";
import {
  useForm,
  SubmitHandler,
  Controller,
  useFieldArray,
  FormProvider,
} from "react-hook-form";
import { IUpdateProductFields } from "../types";
import toast from "react-hot-toast";

import { yupResolver } from "@hookform/resolvers/yup";
import { updateProductSchema } from "../schemas";
import { updateProduct } from "@/api/admin";
import { filteredEmptyNestedFields, filterEmptyFields } from "../utils";

import { useCheckUsers } from "@/components/hooks/useCheckUsers";
import CustomInput from "@/components/ProductCard/FeedBack/CustomInput";
import FieldArray from "../FieldArray";
import CharacteristicsFields from "../CharacteristicsFields";
import { Checkbox } from "@mui/material";
import CustomSpinner from "@/components/Global/Spinner/CustomSpinner";

const defaultValues = {
  title: "",
  price: 0,
  categories: [""],
  characteristics: [{ name: "", description: [""] }],
  inStock: false,
};
interface IUpdateProductFormProps {
  _id: string;
  toggleUpdateModal: () => void;
}

const UpdateProductForm: FC<IUpdateProductFormProps> = ({
  toggleUpdateModal,
  _id,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(updateProductSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { errors },
    control,
  } = methods;

  const { fields: characteristicFields, append: appendCharacteristic } =
    useFieldArray({
      control,
      name: "characteristics",
    });

  const { isUser } = useCheckUsers("user");

  const onSubmit: SubmitHandler<IUpdateProductFields> = async (data) => {
    if (isUser) {
      toast.error(`You do not have access to change products`);
      return;
    }

    try {
      if (!data) {
        toast.error("No data to change");
        return;
      }

      const filteredData = filteredEmptyNestedFields(data);

      setIsLoading(true);
      const resp = await updateProduct(filteredData, _id);
      setIsLoading(false);
      toast.success(resp?.message);
      toggleUpdateModal();
      reset();
    } catch (error) {
      toast.error("Failed to update product");
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      {" "}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <CustomInput label="Title" name="title" />
        </div>
        <div className="mb-4">
          <CustomInput label="Price" name="price" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Categories</label>
          <FieldArray
            control={control}
            name="categories"
            labelPrefix="Category"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Characteristics</label>
          <CharacteristicsFields
            characteristicFields={characteristicFields}
            control={control}
          />
          <button
            type="button"
            onClick={() =>
              appendCharacteristic({ name: "", description: [""] })
            }
            className="text-blue-500 hover:text-blue-700 mt-2"
          >
            Add Characteristic
          </button>
        </div>

        <div className="mb-4">
          <Controller
            name="inStock"
            control={control}
            render={({ field }) => (
              <div className="flex items-center">
                <Checkbox {...field} className="mr-2 leading-tight" />
                <span className="text-gray-700">In Stock</span>
              </div>
            )}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {isLoading ? (
              <CustomSpinner width={20} height={20} />
            ) : (
              "Update product"
            )}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default UpdateProductForm;
