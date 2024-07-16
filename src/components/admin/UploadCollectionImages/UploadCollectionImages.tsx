"use client";

import { uploadCollection } from "@/api/admin";
import { FC, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { IUploadCollection } from "../types";
import toast from "react-hot-toast";
import CustomSpinner from "@/components/Global/Spinner/CustomSpinner";

interface IUploadCollectionImagesProps {
  itemId: string;
  onClose: () => void;
}

const UploadCollectionImages: FC<IUploadCollectionImagesProps> = ({
  itemId,
  onClose,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      image: null,
    },
  });

  const onSubmit: SubmitHandler<IUploadCollection> = async (data) => {
    const formData = new FormData();

    if (!data.image || data?.image?.length === 0) {
      toast.error("Files not chosen yet");
      return;
    }

    Array.from(data.image).forEach((image) => {
      console.log(image);
      formData.append("image", image);
    });

    try {
      setIsLoading(true);
      await uploadCollection(formData, itemId);
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
        name="image"
        control={control}
        defaultValue={null}
        render={({ field }) => (
          <input
            multiple
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

export default UploadCollectionImages;
