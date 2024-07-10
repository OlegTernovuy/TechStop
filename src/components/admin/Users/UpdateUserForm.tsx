"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { ChangeEvent, FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateRole } from "../schemas";
import toast from "react-hot-toast";
import { IUpdateRole, UserRole } from "../types";
import { changeRole } from "@/api/admin";
import { adminToastMessages } from "../constants/adminToastMessages";
import Button from "@/components/ProductCard/Button";
import CustomToast from "@/components/Global/Toaster/CustomToast";
import CustomSpinner from "@/components/Global/Spinner/CustomSpinner";
import { useSession } from "next-auth/react";
import { useCheckUsers } from "@/components/hooks/useCheckUsers";

const defaultValues: IUpdateRole = {
  roles: [],
  email: "",
};

interface IUpdateUserFormProps {
  userId: string;
  toggleModal: () => void;
}

const UpdateUserForm: FC<IUpdateUserFormProps> = ({ userId, toggleModal }) => {
  const [isError, setIsError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState("");

  const { data: authData } = useSession();

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
    if (data.roles.length === 0) {
      toast.error("Roles not selected");
      alert("Roles not selected");
      return;
    }

    if (!Array.isArray(data.roles)) {
      data.roles = [data.roles];
    }

    if (!data) {
      toast.error("Noting to change");
      return;
    }

    const isSuperAdmin = authData?.user?.roles?.find(
      (item) => item === "superadmin"
    );

    if (!isSuperAdmin) {
      toast.error("You don`t have access to change roles");
      alert("You don`t have access to change roles");
      return;
    }

    try {
      await changeRole(data);

      if (isError) {
        throw new Error("Something went wrong");
      }

      toggleModal();
      toast.success(UPDATE_USER_SUCCESS);
      reset();
    } catch (error) {
      setIsError(error as Error);
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
          <select
            defaultValue=""
            {...register("roles")}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              setIsSelected(e.target.value);
            }}
            multiple
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-TechStopBlue focus:border-transparent"
          >
            <option value="" disabled className="text-gray-500">
              Select a role
            </option>
            {Object.values(UserRole).map((role) => (
              <option key={role} value={role} className="text-TechStopBlue">
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
          disabled={isLoading || !isSelected}
          type="submit"
          className={`w-full  text-white p-2  rounded ${
            !isSelected
              ? "bg-gray-700 cursor-not-allowed"
              : "bg-blue-500 cursor-pointer"
          }`}
        >
          {isLoading ? <CustomSpinner width={20} height={20} /> : "Submit"}
        </Button>
        <CustomToast />
      </form>
      <CustomToast />
    </>
  );
};

export default UpdateUserForm;
