"use client";

import { uploadPoster } from "@/api/admin";
import React, { FC, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IUploadPosterForm } from "../types";
import toast from "react-hot-toast";
import CustomSpinner from "@/components/Global/Spinner/CustomSpinner";

interface IUploadPosterProps {
  itemId: string;
  onClose: () => void;
}

const UploadPoster: FC<IUploadPosterProps> = ({ itemId, onClose }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      poster: null,
    },
  });

  const onSubmit: SubmitHandler<IUploadPosterForm> = async (data) => {
    const formData = new FormData();

    if (data.poster && data?.poster?.length > 0) {
      formData.append("poster", data?.poster[0]);
    }

    try {
      setIsLoading(true);
      await uploadPoster(formData, itemId);
      setIsLoading(false);
      toast.success("Poster was successfully uploaded!");
      reset();
      onClose();
    } catch (error) {
      toast.error("Failed to upload a poster");
      setIsLoading(false);
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="poster"
        control={control}
        defaultValue={null}
        render={({ field }) => (
          <input
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            type="file"
            onChange={(e) => {
              field.onChange(e.target.files);
            }}
          />
        )}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="my-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {isLoading ? <CustomSpinner width={20} height={20} /> : "Upload"}
      </button>
    </form>
  );
};

export default UploadPoster;
