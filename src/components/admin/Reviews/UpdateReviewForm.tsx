import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { IUpdateReview } from "../types";
import toast from "react-hot-toast";
import { Rating } from "@/components/ProductCard/FeedBack/Feedback.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateReviewsSchema } from "../schemas";
import Button from "@/components/ProductCard/Button";
import { updateReviewById } from "@/api/admin";
import { filterEmptyFields } from "../utils";
import { TOAST_MESSAGES } from "@/constants/toastMessages";

const defaultValues = {
  advantages: "",
  disadvantages: "",
  comment: "",
  userName: "",
  userEmail: "",
  rating: Number(Rating.excellent),
};

interface IUpdateReviewFormProps {
  productId: string;
}

const { REVIEW_SUCCESS } = TOAST_MESSAGES();

const UpdateReviewForm: React.FC<IUpdateReviewFormProps> = ({ productId }) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(updateReviewsSchema),
  });

  const onSubmit: SubmitHandler<IUpdateReview> = async (data) => {
    const newData = { ...data, productId };

    if (!data) {
      toast.error("Noting to change");
      return;
    }

    const filteredData = filterEmptyFields(newData);

    console.log(filteredData);
    try {
      await updateReviewById(productId, filteredData);
      toast.success(REVIEW_SUCCESS);
      reset();
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto p-4 bg-white rounded shadow "
    >
      <div className="flex flex-wrap -mx-2">
        {" "}
        <div className="w-full px-2 mb-4">
          <label htmlFor="rating" className="block text-gray-700">
            Rating
          </label>
          <Controller
            name="rating"
            control={control}
            rules={{ required: "Rating is required" }}
            render={({ field }) => (
              <select
                id="rating"
                {...field}
                className="w-full text-TechStopBlue p-2 border border-gray-300 rounded"
              >
                <option value="">Select rating</option>
                {[1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.rating && (
            <p className="text-red-500">{errors.rating.message}</p>
          )}
        </div>
        <div className="w-1/2 px-2 mb-4">
          <label htmlFor="advantages" className="block text-gray-700">
            Advantages
          </label>
          <textarea
            id="advantages"
            {...register("advantages")}
            className="w-full p-2 border resize-none text-TechStopBlue border-gray-300 rounded"
          />
          {errors.advantages && (
            <p className="text-red-500">{errors.advantages.message}</p>
          )}
        </div>
        <div className="w-1/2 px-2 mb-4">
          <label htmlFor="disadvantages" className="block text-gray-700">
            Disadvantages
          </label>
          <textarea
            id="disadvantages"
            {...register("disadvantages")}
            className="w-full p-2 border resize-none text-TechStopBlue border-gray-300 rounded"
          />
          {errors.disadvantages && (
            <p className="text-red-500">{errors.disadvantages.message}</p>
          )}
        </div>
        <div className="w-1/2 px-2 mb-4">
          <label htmlFor="comment" className="block text-gray-700">
            Comment
          </label>
          <textarea
            id="comment"
            {...register("comment")}
            className="w-full p-2 border resize-none text-TechStopBlue border-gray-300 rounded"
          />
        </div>
        <div className="w-1/2 px-2 mb-4">
          <label htmlFor="name" className="block text-gray-700">
            Name
          </label>
          <input
            id="name"
            {...register("userName")}
            className="w-full p-2 border text-TechStopBlue border-gray-300 rounded"
          />
          {errors.userName && (
            <p className="text-red-500">{errors.userName.message}</p>
          )}
        </div>
        <div className="w-1/2 px-2 mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("userEmail")}
            className="w-full p-2 border text-TechStopBlue border-gray-300 rounded"
          />
          {errors.userEmail && (
            <p className="text-red-500">{errors.userEmail.message}</p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Submit
      </Button>
    </form>
  );
};

export default UpdateReviewForm;
