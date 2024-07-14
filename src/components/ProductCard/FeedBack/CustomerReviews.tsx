"use client";

import { FC, useEffect } from "react";
import { Rating } from "@mui/material";
import { useFeedbackStore } from "@/store/useFeedbackStore";
import calculateRating from "@/app/utils/calculateRating";
import { formatDate } from "@/app/utils/formatDate";

import CustomToast from "@/components/Global/Toaster";
import CustomSpinner from "@/components/Global/Spinner";

import { useSession } from "next-auth/react";

interface ICustomerReviewsProps {
  productId: string;
}

const CustomerReviews: FC<ICustomerReviewsProps> = ({ productId }) => {
  const { reviews, isLoading, getAllFeedbacks } = useFeedbackStore();

  const { data } = useSession();

  const reviewsUser = useFeedbackStore(({ reviews }) => reviews);
  console.log("reviewsUser", reviewsUser);

  useEffect(() => {
    getAllFeedbacks(productId);
  }, [getAllFeedbacks, productId]);

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
              userId,
              product: { rating },
              advantages,
              comment,
              disadvantages,
              createdAt,
            }) => {
              return (
                <li
                  key={_id}
                  className="relative border border-TechStopBlue40 rounded p-4 mb-8"
                >
                  <h4 className="text-TechStopBlue text-xl font-bold">
                    {data?.user._id === userId
                      ? data?.user?.first_name
                      : "User"}
                  </h4>
                  <Rating
                    name="half-feedback-rating-read"
                    value={calculateRating(rating)}
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
                </li>
              );
            }
          )}
        </ul>
      )}
      <CustomToast />
    </>
  );
};

export default CustomerReviews;
