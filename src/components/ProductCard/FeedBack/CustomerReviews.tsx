"use client";

import { FC, useEffect } from "react";
import { Rating } from "@mui/material";
import { useFeedbackStore } from "@/store/useFeedbackStore";
import calculateRating from "@/app/utils/calculateRating";
import { formatDate } from "@/app/utils/formatDate";
import Button from "../Button";
import Image from "next/image";

import bucket from "/public/product-card-icons/bin.svg";
import CustomToast from "@/components/Global/CustomToast";
import CustomSpinner from "@/components/Global/CustomSpinner";
import toast from "react-hot-toast";

interface ICustomerReviewsProps {
  productId: string;
}

const CustomerReviews: FC<ICustomerReviewsProps> = ({ productId }) => {
  const {
    reviews,
    getFeedbacksList,
    isLoading,
    isError,
    getAllFeedbacks,
    deleteFeedback,
  } = useFeedbackStore();

  useEffect(() => {
    getAllFeedbacks(productId);
  }, [getAllFeedbacks, productId]);

  const handleDeleteFeedback = async (id: string) => {
    await deleteFeedback(id);

    if (isError) {
      toast.error("Помилка видалення");
      return;
    }

    toast.success("Відгук успішно видалено");
  };

  return (
    <>
      {isLoading ? (
        <CustomSpinner />
      ) : (
        <ul>
          {reviews.map(
            ({
              user,
              _id,
              product: { rating },
              advantages,
              comment,
              disadvantages,
              createdAt,
            }) => (
              <li
                key={_id}
                className="relative border border-TechStopBlue40 rounded p-4 mb-8"
              >
                <h4 className="text-TechStopBlue text-xl font-bold">
                  {user?.userName || "User"}
                </h4>
                <Rating
                  name="half-feedback-rating-read"
                  value={Number(calculateRating(rating))}
                  precision={0.5}
                  readOnly
                />
                <ul>
                  <li className="flex items-baseline">
                    {" "}
                    <p className="text-TechStopBlue mt-1 mr-1 text-xl font-bold">
                      Переваги:{" "}
                    </p>
                    <p className="text-TechStopBlue font-normal text-lg ml-1">
                      {advantages}
                    </p>
                  </li>

                  <li className="flex items-baseline">
                    {" "}
                    <p className="text-TechStopBlue mt-1 mr-1 text-xl font-bold">
                      Недоліки:{" "}
                    </p>
                    <p className="text-TechStopBlue font-normal text-lg ml-1">
                      {disadvantages}
                    </p>
                  </li>

                  <li className="flex items-baseline">
                    {" "}
                    <p className="text-TechStopBlue mt-1 mr-1 text-xl font-bold">
                      Коментарі:{" "}
                    </p>
                    <p className="text-TechStopBlue font-normal text-lg ml-1">
                      {comment}
                    </p>
                  </li>
                </ul>
                <p className="hidden md:block text-TechStopBlue absolute right-4 top-4">
                  {formatDate(createdAt)}
                </p>
                <Button
                  className="absolute right-0 bottom-4"
                  type="button"
                  onClick={() => handleDeleteFeedback(String(_id))}
                  disabled={isLoading}
                >
                  <Image src={bucket} width={20} height={20} alt="bucket" />
                </Button>
              </li>
            )
          )}
        </ul>
      )}
      <CustomToast />
    </>
  );
};

export default CustomerReviews;
