"use client";

import { FC, useState } from "react";
import Button from "../Button";
import { useFeedbackStore } from "@/store/useFeedbackStore";
import DefaultFeedbackForm from "./DefaultFeedbackForm";

const FeedbackForm: FC = () => {
  const [show, setShow] = useState(false);
  const { feedback } = useFeedbackStore();

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <div className="hidden md:block">
      {" "}
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
      {!show && feedback.length === 0 && (
        <p className="text-TechStopBlue text-Headline5">
          На цьому товарі ще немає відгуків
        </p>
      )}
      {show && feedback.length === 0 && <DefaultFeedbackForm />}
    </div>
  );
};

export default FeedbackForm;
