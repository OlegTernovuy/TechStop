"use  client";

import React, { FC } from "react";
import { IFormRateProps } from "./Feedback.types";

import Button from "../Button";
import CustomToast from "@/components/Global/CustomToast";
import CustomInput from "./CustomInput";
import CustomSmallInput from "./CustomSmallInput";
import { useFeedbackStore } from "@/store/useFeedbackStore";
import CustomSpinner from "@/components/Global/CustomSpinner";

const FormRate: FC<IFormRateProps> = ({ errors }) => {
  const isError = Object.values(errors).some((error) => error !== undefined);

  const { advantages, disadvantages, comment, userName, userEmail } = errors;

  const { isLoading } = useFeedbackStore();

  return (
    <>
      <div>
        <CustomInput name="advantages" label="Переваги" />
        {advantages && <p className="text-red-500 ">{advantages.message}</p>}
      </div>
      <div>
        {" "}
        <CustomInput name="disadvantages" label="Недоліки" />
        {disadvantages && (
          <p className="text-red-500 ">{disadvantages.message}</p>
        )}
      </div>

      <div>
        {" "}
        <CustomInput name="comment" label="Коментарі" multiline rows={4} />
        {comment && <p className="text-red-500">{comment.message}</p>}
      </div>

      <ul className="xl:flex justify-between flex-wrap gap-6 ">
        {" "}
        <li className="xl:flex gap-4 xl:mb-0">
          {" "}
          <div className="md:mb-4 xl:mb-0">
            {" "}
            <CustomSmallInput name="userName" label="Ім'я" />
            {userName && (
              <p className="text-red-500 mb-4 md:mb-0">{userName.message}</p>
            )}
          </div>
          <div>
            {" "}
            <CustomSmallInput
              name="userEmail"
              label="Email"
              placeholder="example@email.com"
            />
            {userEmail && (
              <p className="text-red-500 mb-6 md:mb-0">{userEmail.message}</p>
            )}
          </div>
        </li>
        <li>
          {" "}
          <Button
            disabled={isError || !!isLoading}
            type="submit"
            className={`w-full h-[56px] xl:min-w-[453px] bg-TechStopBlue text-TechStopWhite   ${
              isError
                ? "disabled:opacity-50  cursor-not-allowed"
                : "hover:bg-TechStopBlue60 focus:bg-TechStopBlue60"
            }`}
          >
            {isLoading ? (
              <CustomSpinner width={40} height={40} />
            ) : (
              " Залишити відгук"
            )}
          </Button>
        </li>
      </ul>

      <CustomToast />
    </>
  );
};

export default FormRate;
