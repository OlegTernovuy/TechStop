"use client";

import Button from "@/components/ProductCard/Button";
import React, { FC, useState } from "react";
import toast from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { filterEmptyFields, isObjectFilled } from "../utils";
import { updateCategory } from "@/api/admin";
import { IUpdateCategory } from "../types";
import { updateCategorySchema } from "../schemas";
import { adminToastMessages } from "../constants/adminToastMessages";
import CustomSpinner from "@/components/Global/Spinner/CustomSpinner";

const defaultValues = {
  title: "",
  parent: "",
  icon: "",
};

const { UPDATE_CATEGORY_ERROR, UPDATE_CATEGORY_SUCCESS } = adminToastMessages();

interface IUpdateCategoryFormProps {
  slug: string;
  toggleUpdateModal: () => void;
}

const UpdateCategoryForm: FC<IUpdateCategoryFormProps> = ({
  slug,
  toggleUpdateModal,
}) => {
  const [isError, setIsError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(updateCategorySchema),
  });

  const onSubmit: SubmitHandler<IUpdateCategory> = async (data) => {
    const hasChanges = isObjectFilled(data);

    if (!data || !hasChanges) {
      toast.error("Noting to change");
      return;
    }

    const filteredData = filterEmptyFields(data);

    console.log(filteredData);
    try {
      setIsLoading(true);
      setIsError(null);
      await updateCategory(filteredData, slug);
      if (isError) {
        toast.error(isError?.message);
        throw new Error(isError.message);
      }

      setIsLoading(false);
      toast.success(UPDATE_CATEGORY_SUCCESS);
      toggleUpdateModal();
      reset();
    } catch (error) {
      setIsLoading(false);
      setIsError(error as Error);
      console.log((error as Error).message);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-lg mx-auto p-4 bg-white rounded shadow "
      >
        <div className="flex flex-wrap -mx-2">
          <div className="w-1/2 px-2 mb-4">
            <label htmlFor="title" className="block text-gray-700">
              Title
            </label>
            <input
              id="title"
              {...register("title")}
              className="w-full p-2 border resize-none text-TechStopBlue border-gray-300 rounded"
            />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
          </div>
          <div className="w-1/2 px-2 mb-4">
            <label htmlFor="parent" className="block text-gray-700">
              Parent
            </label>
            <input
              id="parent"
              {...register("parent")}
              className="w-full p-2 border resize-none text-TechStopBlue border-gray-300 rounded"
            />
            {errors.parent && (
              <p className="text-red-500">{errors.parent.message}</p>
            )}
          </div>
          <div className="w-1/2 px-2 mb-4">
            <label htmlFor="icon" className="block text-gray-700">
              Icon
            </label>
            <input
              id="icon"
              {...register("icon")}
              className="w-full p-2 border resize-none text-TechStopBlue border-gray-300 rounded"
            />
            {errors.icon && (
              <p className="text-red-500">{errors.icon.message}</p>
            )}
          </div>
        </div>

        <Button
          disabled={isLoading}
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          {isLoading ? <CustomSpinner width={20} height={20} /> : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default UpdateCategoryForm;
