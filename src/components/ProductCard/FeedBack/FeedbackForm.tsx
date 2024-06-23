"use client";

import { FC, useState } from "react";
import { IParams } from "@/types";
import DefaultFeedbackForm from "./DefaultFeedbackForm";
import Button from "../Button";

import { useFeedbackStore } from "@/store/useFeedbackStore";

const FeedbackForm: FC<IParams> = ({ params }) => {
  const [show, setShow] = useState(false);
  const { reviews } = useFeedbackStore();

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <div className="hidden md:block">
      {!show && (
        <div className="border border-TechStopBlue60 flex justify-between items-center p-4 rounded mb-4">
          <p className="text-TechStopBlue60">
            Залишити свій відгук про цей товар
          </p>

          <Button
            type="button"
            className="text-TechStopBlue font-medium hover:bg-TechStopBlue60"
            onClick={handleClick}
          >
            Залишити відгук
          </Button>
        </div>
      )}
      {show && reviews.length !== 0 && <DefaultFeedbackForm params={params} />}
    </div>
  );
};

export default FeedbackForm;
