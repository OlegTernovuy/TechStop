"use client";

import { FC, useEffect } from "react";
import { Rating } from "@mui/material";
import { useFeedbackStore } from "@/store/useFeedbackStore";
import calculateRating from "@/app/utils/calculateRating";
import { formatDate } from "@/app/utils/formatDate";
import Button from "../Button";
import Image from "next/image";

import bucket from "/public/product-card-icons/bin.svg";
import { IParams } from "@/types";
import CustomToast from "@/components/Global/CustomToast";

const CustomerReviews: FC = () => {
  const { reviews, getAllFeedbacks, deleteFeedback } = useFeedbackStore();

  useEffect(() => {
    getAllFeedbacks();
  }, [getAllFeedbacks]);

  return (
    <>
      <ul>
        {reviews.map(
          ({
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
              <h4 className="text-TechStopBlue text-xl font-bold">Bob</h4>
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
                className="absolute right-4 bottom-4"
                type="button"
                onClick={() => deleteFeedback(String(_id))}
              >
                <Image src={bucket} width={30} height={30} alt="bucket" />
              </Button>
            </li>
          )
        )}

        <CustomToast />
      </ul>
    </>
  );
};

export default CustomerReviews;
