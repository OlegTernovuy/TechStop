import { FC } from "react";
import { IParams } from "@/types";

import FeedbackPage from "@/components/ProductCard/FeedBack/Feedback";
import { getProductById } from "@/api";

const Page: FC<IParams> = async ({ params }) => {
  const { _id } = params;

  if (!params) {
    return <div>Loading...</div>;
  }

  const product = await getProductById(_id);

  return <FeedbackPage product={product.data} params={params} />;
};

export default Page;
