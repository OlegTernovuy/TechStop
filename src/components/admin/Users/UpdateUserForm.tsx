"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import React, { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateRole } from "../schemas";
import toast from "react-hot-toast";
import { IUpdateRole, UserRole } from "../types";
import { changeRole } from "@/api/admin";
import { adminToastMessages } from "../constants/adminToastMessages";
import Button from "@/components/ProductCard/Button";
import { useAdminAuth } from "@/store/useAdminAuth";
import CustomToast from "@/components/Global/Toaster/CustomToast";

const defaultValues: IUpdateRole = {
  roles: [],
  email: "",
};

interface IUpdateUserFormProps {
  userId: string;
}

const UpdateUserForm: FC<IUpdateUserFormProps> = ({ userId }) => {
  // const [isError, setIsError] = useState<Error | null>(null);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [role, setRole] = useState([""]);
  const { roles } = useAdminAuth();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(updateRole),
  });

  const { UPDATE_USER_SUCCESS } = adminToastMessages(userId);

  const onSubmit: SubmitHandler<IUpdateRole> = async (data) => {
    if (!Array.isArray(data.roles)) {
      data.roles = [data.roles];
    }

    if (!data) {
      toast.error("Noting to change");
      return;
    }

    const isUser = roles?.find((item) => item === "user" || item === "admin");

    // if (isUser) {
    //   toast.error("You don`t have access to change users");
    //   alert("You don`t have access to change users");
    //   return;
    // }

    try {
      await changeRole(data);

      toast.success(UPDATE_USER_SUCCESS);
      reset();
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-lg mx-auto p-4 bg-white rounded shadow "
      >
        <div className="max-w-full px-2 mb-4">
          <label htmlFor="roles" className="block text-gray-700">
            Roles
          </label>
          {/* <input
            id="roles"
            {...register("roles")}
            className="w-full p-2 border text-TechStopBlue border-gray-300 rounded"
          /> */}
          <select {...register("roles")} multiple className="bg-TechStopBlue">
            {Object.values(UserRole).map((role) => (
              <option key={role} value={role} className="bg-TechStopBlue">
                {role}
              </option>
            ))}
          </select>

          {errors.roles && (
            <p className="text-red-500">{errors.roles.message}</p>
          )}
        </div>
        <div className="w-full px-2 mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            id="email"
            {...register("email")}
            className="w-full p-2 border text-TechStopBlue border-gray-300 rounded"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export default UpdateUserForm;
