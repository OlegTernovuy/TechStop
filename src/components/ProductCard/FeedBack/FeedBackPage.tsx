"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { FC, useEffect, useMemo, useState } from "react";
import CustomerReviews from "./CustomerReviews";
import PreviewCard from "./PreviewCard";
import Button from "../Button";
import CustomToast from "@/components/Global/CustomToast";
import FeedbackForm from "./FeedbackForm";
import { IParams } from "@/types";
import { getProductById } from "@/api";
import { IProduct } from "../ProductCard.types";
import DefaultFeedbackForm from "./DefaultFeedbackForm";

const FeedbackPage: FC<IParams> = ({ params }) => {
  const { id } = params;
  const [data, setData] = useState<IProduct | null>(null);

  const productData = useMemo(() => {
    return getProductById(id);
  }, [id]);

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await productData;

      setData(product);
    };

    fetchProduct();
  }, [productData]);

  return (
    <MaxWidthWrapper>
      <div className="mt-4 ">
        {" "}
        <h2 className="text-TechStopBlue text-[24px] md:text-5xl font-normal mb-4 md:mb-8">
          Відгуки покупців про {data?.data?.title}
        </h2>
        <h2 className="text-TechStopBlue font-normal text-base md:text-[34px] mb-6 md:mb-8">
          Будьте першим, хто залишить відгук про товар
        </h2>
        <ul className="md:flex gap-10 ">
          {" "}
          <li className="w-full">
            {" "}
            <Button
              color="TechStopWhite"
              bgColor="TechStopBlue"
              type="button"
              className="md:hidden w-full py-2 px-6 mb-4 rounded font-medium uppercase"
            >
              Залишити відгук
            </Button>
            {/* <FeedbackForm /> */}
            <DefaultFeedbackForm />
            {/* <CustomerReviews /> */}
          </li>
          <li>
            <div className="min-h-[96%] border-l border-TechStopBlue hidden md:block"></div>
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
