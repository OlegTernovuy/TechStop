"use client";

import { FC, useEffect, useMemo, useState } from "react";
import { IParams, Product } from "@/types";
import { IProduct } from "../ProductCard.types";
import { getProductById } from "@/api";
import { useFeedbackStore } from "@/store/useFeedbackStore";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import CustomerReviews from "./CustomerReviews";
import PreviewCard from "./PreviewCard";
import Button from "../Button";
import FeedbackForm from "./FeedbackForm";
import DefaultFeedbackForm from "./DefaultFeedbackForm";

import CustomToast from "@/components/Global/Toaster";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { TOAST_MESSAGES } from "@/constants/toastMessages";

import { useRouter } from "next/navigation";

const { AUTH_ERROR } = TOAST_MESSAGES();

interface IFeedbackPageProps {
  product: Product;
  params: {
    _id: string;
  };
}

const FeedbackPage: FC<IFeedbackPageProps> = ({ product, params }) => {
  const { _id } = product;

  const [showFeedback, setShowFeedback] = useState(false);
  const { reviews } = useFeedbackStore();
  const { data: userData } = useSession();

  const router = useRouter();

  const handleLeaveFeedback = () => {
    if (!userData?.token) {
      toast.error(AUTH_ERROR);
      return;
    }

    if (userData?.token && !userData?.user?.first_name) {
      toast.error("Заповніть контактну інформацію");
      router.push("/account");
      return;
    }

    setShowFeedback(!showFeedback);
  };

  return (
    <MaxWidthWrapper>
      <div className="mt-4 ">
        {" "}
        <h2 className="text-TechStopBlue text-[24px] md:text-5xl font-normal mb-4 md:mb-8">
          Відгуки покупців про {product?.title}
        </h2>
        {reviews.length === 0 && (
          <h2 className="text-TechStopBlue font-normal text-base md:text-[34px] mb-6 md:mb-8">
            Будьте першим, хто залишить відгук про товар
          </h2>
        )}
        <ul className="md:flex gap-10 ">
          <li className="w-full">
            <div className="md:hidden">
              {!showFeedback && reviews?.length !== 0 && (
                <Button
                  color="TechStopWhite"
                  bgColor="TechStopBlue"
                  type="button"
                  className="w-full py-2 px-6 h-[56px] mb-4"
                  onClick={handleLeaveFeedback}
                >
                  Залишити відгук
                </Button>
              )}
              {showFeedback && reviews.length !== 0 && (
                <DefaultFeedbackForm params={params} />
              )}
            </div>

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
            <PreviewCard productData={product} />
          </li>
        </ul>
      </div>
      <CustomToast />
    </MaxWidthWrapper>
  );
};

export default FeedbackPage;
