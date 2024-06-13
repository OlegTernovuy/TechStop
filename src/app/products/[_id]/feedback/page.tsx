import { FC } from "react";
import { IParams } from "@/types";

import FeedbackPage from "@/components/ProductCard/FeedBack/Feedback";

const Page: FC<IParams> = ({ params }) => <FeedbackPage params={params} />;

export default Page;
