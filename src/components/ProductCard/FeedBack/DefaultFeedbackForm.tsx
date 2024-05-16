"use client";

import { FC } from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { InputLabel, MenuItem, TextField } from "@mui/material";
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
const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

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
  productId: yup.string(),
});

const MenuProps = {
  PaperProps: {
    style: {
      maxWidth: "100%",
    },
  },
};

const DefaultFeedbackForm: FC<IParams> = ({ params }) => {
  const { addNewFeedback } = useFeedbackStore();

  const { _id } = params;

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      advantages: "",
      disadvantages: "",
      comment: "",
      userName: "",
      userEmail: "",
      productId: "",
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

  const onSubmit: SubmitHandler<Review> = (data) => {
    if (!data) {
      toast.error("Field can`t be is empty");
      return;
    }

    data.productId = _id;
    console.log(data);

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
          <InputLabel id="rating">Оцініть товар</InputLabel>
          <Controller
            name="rating"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                {...register("rating")}
                className="border border-TechStopBlue"
                label="rating"
                id="rating"
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

        <TextField
          className="hidden"
          id="productId"
          name="productId"
          value={_id}
        />
      </form>
    </FormProvider>
  );
};

export default DefaultFeedbackForm;

//dimon.bond.94@gmail.com
