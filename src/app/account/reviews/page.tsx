import React from "react";
import SingleReview from "./SingleReview";
import { reviews } from "@/constants";
import Link from "next/link";
import { IReviewPersonalAccount } from "@/types";

const Reviews = () => {
  return (
    <div>
      <h2 className="w-full text-Headline5 md:text-Headline4 text-TechStopBlue mb-4 md:mb-6">
      Мої відгуки
      </h2>
      <ul className="flex flex-col gap-2 w-full">
        {reviews &&
          reviews.map((review: IReviewPersonalAccount) => (
            <li
              key={review.id}
            >
              <Link href={`/account/reviews`}>
              {/* <Link href={`/products/${review.id}/about-product`}> */}
                <SingleReview review={review} />
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Reviews;
