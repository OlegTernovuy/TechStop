"use client";

import { FC } from "react";
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
import { Rating, IFormFeedback, ratingValues } from "./Feedback.types";

import FormRate from "./FormRate";

const nameRegex = /^[A-Aa-Я]+$/i;
const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const schema = yup.object({
  value: yup.string().required("Це поле є обов'язковим"),
  benefits: yup.string().required("Це поле є обов'язковим"),
  disadvantages: yup.string().required("Це поле є обов'язковим"),
  comments: yup.string().min(1, "Занадто коротко").max(99, "Занадто довге"),
  name: yup
    .string()
    .min(1, "Занадто коротко")
    .max(80, "Занадто довге")
    .matches(nameRegex, "Некоректне ім'я")
    .required(),
  email: yup.string().matches(emailRegex, "Некоректний email").required(),
});

const MenuProps = {
  PaperProps: {
    style: {
      maxWidth: "100%",
    },
  },
};

const DefaultFeedbackForm: FC = () => {
  const { addNewFeedback } = useFeedbackStore();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      benefits: "",
      disadvantages: "",
      comments: "",
      name: "",
      email: "",
      value: Rating.excellent,
    },
  });

  const {
    reset,
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<IFormFeedback> = (data) => {
    if (!data) {
      toast.error("Field can`t be is empty");
      return;
    }

    addNewFeedback(data);
    toast.success("Дякую за відгук 🙌");
    reset();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mb-6"
      >
        <FormControl className="w-full border mb-4">
          <InputLabel id="value">Оцініть товар</InputLabel>
          <Controller
            name="value"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                {...register("value")}
                className="border border-TechStopBlue"
                label="value"
                id="value"
                MenuProps={MenuProps}
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
  );
};

export default DefaultFeedbackForm;
