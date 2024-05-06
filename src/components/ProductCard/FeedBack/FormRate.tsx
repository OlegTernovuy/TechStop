import React from "react";
import { FC } from "react";
import Button from "../Button";
import CustomToast from "@/components/Global/CustomToast";
import CustomInput from "./CustomInput";
import CustomSmallInput from "./CustomSmallInput";
import * as yup from "yup";

const schema = yup.object({
  benefits: yup.string(),
  comments: yup.string().matches(/^[A-Za-z]+$/i),
});

const FormRate: FC = () => {
  return (
    <>
      <CustomInput name="benefits" label="Переваги" />
      <CustomInput name="disadvantages" label="Недоліки" />
      <CustomInput name="comments" label="Коментарі" multiline rows={4} />
      <div className="flex gap-6 ">
        {" "}
        <CustomSmallInput name="name" label="Ім'я" />
        <CustomSmallInput name="email" label="Email" />
        <Button
          type="submit"
          className=" w-full max-w-[453px] bg-TechStopBlue text-TechStopWhite hover:bg-TechStopBlue60 focus:bg-TechStopBlue60"
        >
          Залишити відгук
        </Button>
      </div>

      <CustomToast />
    </>
  );
};

export default FormRate;
