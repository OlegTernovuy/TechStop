import { getProductsData } from "@/api";
import React, { FC } from "react";
import RecommendationListItem from "./RecommendationListItem";

interface IRecommendationListProps {
  title: string;
}

const RecommendationList: FC<IRecommendationListProps> = async ({ title }) => {
  const products = await getProductsData();

  return (
    <div className="hidden md:block">
      <h2 className="text-Headline6 text-TechStopBlue md:text-Headline5 lg:text-Headline4">
        {title}
      </h2>
      <div className="flex justify-center">
        <ul className="flex  md:flex-wrap md:justify-between xl:flex-nowrap items-center  gap-x-[52px] gap-y-4 w-full mt-[51px] mb-20">
          <RecommendationListItem products={products} />
        </ul>
      </div>
    </div>
  );
};

export default RecommendationList;
