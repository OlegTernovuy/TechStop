"use client";

import { FC, useEffect, useMemo, useState } from "react";
import { IParams } from "@/types";
import { IProduct } from "../ProductCard.types";
import { getProductById } from "@/api";
import { useFeedbackStore } from "@/store/useFeedbackStore";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import CustomerReviews from "./CustomerReviews";
import PreviewCard from "./PreviewCard";
import Button from "../Button";
import FeedbackForm from "./FeedbackForm";
import DefaultFeedbackForm from "./DefaultFeedbackForm";

import CustomToast from "@/components/Global/CustomToast";

const FeedbackPage: FC<IParams> = ({ params }) => {
  const { _id } = params;

  const [data, setData] = useState<IProduct | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const { reviews } = useFeedbackStore();

  const productData = useMemo(() => {
    return getProductById(_id);
  }, [_id]);

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await productData;
      setData(product);
    };

    fetchProduct();
  }, [productData]);

  const handleLeaveFeedback = () => {
    setShowFeedback(!showFeedback);
  };

  return (
    <MaxWidthWrapper>
      <div className="mt-4 ">
        {" "}
        <h2 className="text-TechStopBlue text-[24px] md:text-5xl font-normal mb-4 md:mb-8">
          Відгуки покупців про {data?.data?.title}
        </h2>
        {reviews.length === 0 && (
          <h2 className="text-TechStopBlue font-normal text-base md:text-[34px] mb-6 md:mb-8">
            Будьте першим, хто залишить відгук про товар
          </h2>
        )}
        <ul className="md:flex gap-10 ">
          <li className="w-full">
            {reviews.length !== 0 ? (
              <Button
                color="TechStopWhite"
                bgColor="TechStopBlue"
                type="button"
                className="md:hidden w-full py-2 px-6 h-[56px] mb-4"
                onClick={handleLeaveFeedback}
              >
                Залишити відгук
              </Button>
            ) : (
              <div className="md:hidden mb-[54px]">
                {showFeedback && reviews.length === 0 && (
                  <DefaultFeedbackForm params={params} />
                )}
              </div>
            )}
            {showFeedback && <DefaultFeedbackForm params={params} />}
            {reviews.length !== 0 ? (
              <FeedbackForm params={params} />
            ) : (
              <div className="mb-[84px]">
                <DefaultFeedbackForm params={params} />
              </div>
            )}
            <CustomerReviews productId={_id} />
          </li>
          <li>
            <div className="min-h-[99%] border-l border-deWiseGreyLight hidden md:block"></div>
          </li>
          <li className="hidden md:block max-w-[522px]">
            <PreviewCard productData={data} />
          </li>
        </ul>
      </div>
      <CustomToast />
    </MaxWidthWrapper>
  );
};

export default FeedbackPage;
