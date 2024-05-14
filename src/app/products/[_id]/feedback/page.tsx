import FeedbackPage from "@/components/ProductCard/FeedBack/Feedback";
import { IParams } from "@/types";
import { FC } from "react";

const Page: FC<IParams> = ({ params }) => {
  return <FeedbackPage params={params} />;
};

export default Page;
