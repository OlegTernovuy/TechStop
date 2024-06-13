"use client";

import { FC, useState } from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { InputLabel, MenuItem } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";

import CustomToast from "@/components/Global/CustomToast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFeedbackStore } from "@/store/useFeedbackStore";
import { ratingValues, Rating } from "./Feedback.types";

import FormRate from "./FormRate";
import { Review, IParams } from "@/types";

const nameRegex = /^[A-Aa-Я]+$/i;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const schema = yup.object({
  rating: yup.number().required("Це поле є обов'язковим"),
  advantages: yup.string().required("Це поле є обов'язковим"),
  disadvantages: yup.string().required("Це поле є обов'язковим"),
  comment: yup.string(),
  userName: yup
    .string()
    .min(1, "Занадто коротко")
    .max(80, "Занадто довге")
    .matches(nameRegex, "Некоректне ім'я")
    .required(),
  userEmail: yup.string().matches(emailRegex, "Некоректний email").required(),
});

const MenuProps = {
  PaperProps: {
    style: {
      maxWidth: "100%",
    },
  },
};

const DefaultFeedbackForm: FC<IParams> = ({ params }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const { addNewFeedback, isError } = useFeedbackStore();

  const { _id: productId } = params;

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      advantages: "",
      disadvantages: "",
      comment: "",
      userName: "",
      userEmail: "",
      rating: Number(Rating.excellent),
    },
  });

  const {
    reset,
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = methods;

  const userId = "6622e62c5f5fd48246c5fa2a";

  const onSubmit: SubmitHandler<Review> = async (data) => {
    const newData = { ...data, productId, userId };
    const { userEmail, ...filteredData } = newData;

    try {
      await addNewFeedback(filteredData);
      toast.success("Дякуємо за відгук 🙌");
      reset();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mb-6"
        >
          <FormControl className="w-full border mb-4">
            <InputLabel id="rating">Оцініть товар</InputLabel>
            <Controller
              name="rating"
              control={control}
              render={({ field }) => (
                <Select
                  // {...field}
                  {...register("rating")}
                  label="Оцініть товар"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  labelId="rating"
                  id="rating"
                  MenuProps={MenuProps}
                  className={`${
                    isFocused
                      ? "border-transparent"
                      : "border border-TechStopBlue60"
                  }`}
                  input={<OutlinedInput label="Оцініть товар" />}
                >
                  {ratingValues.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>

          <FormRate errors={errors} />

          <CustomToast />
        </form>
      </FormProvider>
    </>
  );
};

export default DefaultFeedbackForm;

//dimon.bond.94@gmail.com
