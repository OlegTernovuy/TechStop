"use client";

import { FC, useState } from "react";
import toast from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createCategorySchema } from "../schemas";
import Button from "@/components/ProductCard/Button";
import CustomSpinner from "@/components/Global/Spinner/CustomSpinner";
import { ICreateCategory } from "../types";
import { filterEmptyFields, isObjectFilled } from "../utils";
import { createCategory } from "@/api/admin";
import { adminToastMessages } from "../constants/adminToastMessages";
import CustomToast from "@/components/Global/Toaster/CustomToast";

const defaultValues = {
  title: "",
  parent: "",
  icon: "",
};

const { CREATE_ORDER_ERROR, CREATE_ORDER_SUCCESS } = adminToastMessages();

interface ICreateCategoryFormProps {
  toggleModal: () => void;
}

const CreateCategoryForm: FC<ICreateCategoryFormProps> = ({ toggleModal }) => {
  const [isError, setIsError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(createCategorySchema),
  });

  const onSubmit: SubmitHandler<ICreateCategory> = async (data) => {
    const hasChanges = isObjectFilled(data);

    if (!data || !hasChanges) {
      toast.error("Noting to change");
      return;
    }

    const filteredData = filterEmptyFields(data);

    try {
      setIsLoading(true);
      await createCategory(filteredData as ICreateCategory);

      if (isError) {
        setIsError(isError);
        throw new Error("Error");
      }

      setIsLoading(false);
      toast.success(CREATE_ORDER_SUCCESS);
      toggleModal();

      reset();
    } catch (error) {
      setIsLoading(false);
      setIsError(error as Error);
      toast.error(isError?.message ?? CREATE_ORDER_ERROR);
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
        <CustomToast />
      </form>
    </div>
  );
};

export default CreateCategoryForm;
