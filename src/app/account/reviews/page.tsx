import React from "react";
import SingleReview from "./SingleReview";
import { getAllFeedbacks } from "@/api";
import { IRewiewData } from "./typeRewiew";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

const Reviews = async () => {
  const session = await getServerSession(authOptions);
  const userId: string =
    session?.user?._id !== undefined ? session?.user?._id : "";

  const reviews = await getAllFeedbacks(userId);  

  return (
    <div>
      <h2 className="w-full hidden md:flex text-Headline5 md:text-Headline4 text-TechStopBlue mb-4 md:mb-6">
        Мої відгуки
      </h2>
      <ul className="flex flex-col gap-2 w-full">
        {reviews &&
          reviews?.map((review: IRewiewData) => (
            <li key={review._id}>
                <SingleReview review={review} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Reviews;
