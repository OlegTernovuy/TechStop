"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import CustomerReviews from "./CustomerReviews";
import PreviewCard from "./PreviewCard";
import Button from "../Button";

type Inputs = {
  example: string;
  exampleRequired: string;
};

const FeedBackPage: FC = () => {
  // const [value, setValue] = React.useState<number | null>(2);

  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      feedback: "",
    },
  });

  const handleLeaveFeedback = (data: string) => {
    console.log("тут буде оброблюватись feedback");
    console.log(data);
  };
  console.log(watch("feedback"));

  return (
    <MaxWidthWrapper>
      <div className="mt-4 mb-[34px]">
        {" "}
        <h2 className="text-TechStopBlue mb-4">
          Геймпад Microsoft Xbox Series X | S Wireless Controller Velocity Green
          (QAU-00091)
        </h2>
        <ul className="md:flex items-center gap-10">
          {" "}
          <li>
            {" "}
            <Button
              color="TechStopWhite"
              bgColor="TechStopBlue"
              type="button"
              className="md:hidden w-full py-2 px-6 mb-4 rounded font-medium uppercase"
              onClick={() => {}}
              // onClick={handleLeaveFeedback}
            >
              Залишити відгук
            </Button>
            <form
              // onSubmit={handleSubmit(handleLeaveFeedback)}
              className="hidden md:flex items-center border border-TechStopBlue rounded p-4 mb-6"
            >
              {" "}
              <input
                {...register("feedback")}
                type="text"
                placeholder="Залиште свій відгук"
                className="placeholder-black::placeholder text-TechStopBlue"
              />
              {/* {errors.exampleRequired && <span>This field is required</span>} */}
              <button
                type="submit"
                className="ml-auto font-medium uppercase text-TechStopBlue bg-TechStopWhite"
              >
                Залишити відгук
              </button>
            </form>
            <CustomerReviews />
          </li>
          <li>
            <div className="h-[454px] border-l border-TechStopBlue"></div>
          </li>
          <li className="hidden md:block">
            <PreviewCard />
          </li>
        </ul>
      </div>
    </MaxWidthWrapper>
  );
};

export default FeedBackPage;
