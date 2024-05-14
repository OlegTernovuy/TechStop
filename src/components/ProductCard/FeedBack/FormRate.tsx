import React from "react";
import { FC } from "react";
import Button from "../Button";
import CustomToast from "@/components/Global/CustomToast";
import CustomInput from "./CustomInput";
import CustomSmallInput from "./CustomSmallInput";
import { IFormRateProps } from "./Feedback.types";

const FormRate: FC<IFormRateProps> = ({ errors }) => {
  const isError = Object.values(errors).some((error) => error !== undefined);

  const { benefits, disadvantages, comments, name, email } = errors;

  return (
    <>
      <div>
        <CustomInput name="benefits" label="Переваги" />
        {benefits && <p className="text-red-500 ">{benefits.message}</p>}
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
        <CustomInput name="comments" label="Коментарі" multiline rows={4} />
        {comments && <p className="text-red-500">{comments.message}</p>}
      </div>

      <ul className="xl:flex justify-between flex-wrap gap-6 ">
        {" "}
        <li className="xl:flex gap-4 xl:mb-0">
          {" "}
          <div className="md:mb-4 xl-mb-0">
            {" "}
            <CustomSmallInput name="name" label="Ім'я" />
            {name && (
              <p className=" text-red-500 mb-4 md:mb-0">{name.message}</p>
            )}
          </div>
          <div>
            {" "}
            <CustomSmallInput name="email" label="example@email.com" />
            {email && (
              <p className="text-red-500 mb-6 md:mb-0">{email.message}</p>
            )}
          </div>
        </li>
        <li>
          {" "}
          <Button
            disabled={isError}
            type="submit"
            className={`w-full h-[56px] xl:min-w-[453px] bg-TechStopBlue text-TechStopWhite   ${
              isError
                ? "disabled:opacity-50  cursor-not-allowed"
                : "hover:bg-TechStopBlue60 focus:bg-TechStopBlue60"
            }`}
          >
            Залишити відгук
          </Button>
        </li>
      </ul>

      <CustomToast />
    </>
  );
};

export default FormRate;
