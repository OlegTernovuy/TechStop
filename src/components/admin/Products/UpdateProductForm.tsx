"use client";

import React, { FC, useEffect, useState } from "react";
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
import { filteredEmptyNestedFields } from "../utils";

import { useCheckUsers } from "@/components/hooks/useCheckUsers";
import CustomInput from "@/components/ProductCard/FeedBack/CustomInput";
import FieldArray from "../FieldArray";
import CharacteristicsFields from "../CharacteristicsFields";
import { Checkbox } from "@mui/material";
import CustomSpinner from "@/components/Global/Spinner/CustomSpinner";
import { ICharacteristic } from "@/types";
import { getProductById } from "@/api";
import CheckBoxCharacteristics from "./CheckBoxCharacteristics";

const defaultValues = {
  title: "",
  price: 0,
  categories: [""],
  characteristics: [{ name: "", description: [""] }],
  inStock: true,
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
  const [characteristics, setCharacteristics] = useState<
    ICharacteristic[] | []
  >([]);
  const [checkedCharacteristics, setCheckedCharacteristics] = useState<
    { name: string; description: string[] }[]
  >([]);

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(updateProductSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = methods;

  const { fields: characteristicFields, append: appendCharacteristic } =
    useFieldArray({
      control,
      name: "characteristics",
    });

  const { isUser } = useCheckUsers("user");

  useEffect(() => {
    const fetchProductById = async () => {
      setIsLoading(true);
      const characteristics = await getProductById(_id);
      setCharacteristics(characteristics?.data?.characteristics || []);
      setIsLoading(false);
    };
    fetchProductById();
  }, [_id, reset]);

  const updateCharacteristics = (name: string, checked: boolean) => {
    const characteristic =
      characteristics && characteristics?.find((char) => char?.name === name);

    if (characteristic) {
      if (checked) {
        setCheckedCharacteristics((prev) => [
          ...prev,
          {
            name: characteristic.name,
            description: characteristic.description || [],
          },
        ]);
      } else {
        setCheckedCharacteristics((prev) =>
          prev.filter((char) => char.name !== name)
        );
      }
    }
  };

  const onSubmit: SubmitHandler<IUpdateProductFields> = async (data) => {
    if (isUser) {
      toast.error(`You do not have access to change products`);
      return;
    }

    if (!data) {
      toast.error("No data to change");
      return;
    }

    const isEmpty = data.characteristics
      ?.map((item) => item)
      .some(({ name, description }) => name === "" || !description);

    if (isEmpty) {
      toast.error("No data to change");
      return;
    }

    try {
      const mergedCharacteristics = [
        ...checkedCharacteristics,
        ...(data?.characteristics || []),
      ];

      const filteredData = {
        ...data,
        characteristics: mergedCharacteristics,
      };

      const finalData = filteredEmptyNestedFields(filteredData);
      console.log("finalData", filteredData);

      setIsLoading(true);
      const resp = await updateProduct(finalData, _id);
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

          <CheckBoxCharacteristics
            characteristics={characteristics}
            updateCharacteristics={updateCharacteristics}
          />

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
