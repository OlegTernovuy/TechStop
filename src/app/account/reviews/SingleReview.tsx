import { IReviewPersonalAccount } from "@/types";
import Image from "next/image";
import { IRewiewData } from "./typeRewiew";
import defaultProductIcon from "../../../../public/defaultProductIcon.svg";

type TReviewProps = {
  review: IRewiewData;
};

const SingleReview = ({ review }: TReviewProps) => {
  return (
    <div className="flex gap-4 items-center p-4 border border-TechStopBlue40 rounded-md">
      <Image
        src={
          review.product.poster !== null
            ? review.product.poster
            : defaultProductIcon
        }
        alt="ProductIcon"
        className="max-h-8 object-cover"
        width={46}
        height={32}
      />
      <span className="text-subtitle1 text-TechStopBlue underline">
        {review.comment}
      </span>
    </div>
  );
};

export default SingleReview;
