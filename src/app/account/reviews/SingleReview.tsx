import { IReviewPersonalAccount } from "@/types";
import Image from "next/image";

type TReviewProps = {
  review: IReviewPersonalAccount;
};

const SingleReview = ({ review }: TReviewProps) => {
  return (
    <div className="flex gap-4 items-center p-4 border border-TechStopBlue40 rounded-md">
      <Image src={review.icon} alt="ProductIcon" width={46} height={32} />
      <span className="text-subtitle1 text-TechStopBlue underline">{review.title}</span>
    </div>
  );
};

export default SingleReview;
