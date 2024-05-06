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

import { useFeedbackStore } from "@/store/useFeedbackStore";

import FormRate from "./FormRate";

import * as yup from "yup";
import toast from "react-hot-toast";
import CustomToast from "@/components/Global/CustomToast";
import { useBaseFeedbackStore } from "@/store/useBaseFeedbackStore";

const futureSchema = yup.object({
  rating: yup.string(),
  benefits: yup
    .string()
    .matches(/^[A-Za-z]+$/i)
    .required(),
  disadvantages: yup
    .string()
    .matches(/^[A-Za-z]+$/i)
    .required(),
  comments: yup.string().min(1).max(99),
});

const MenuProps = {
  PaperProps: {
    style: {
      maxWidth: "100%",
    },
  },
};

enum Rating {
  excellent = "Excellent",
  veryGood = "Very good",
  good = "Good",
  notToBad = "Not bad",
  bad = "Bad",
}

interface IFormFeedback {
  id: string;
  comments: string;
  rating: Rating;
  benefits: string;
  disadvantages: string;
  name: string;
  email: string;
}

const ratingValues: Rating[] = [
  Rating.excellent,
  Rating.veryGood,
  Rating.good,
  Rating.notToBad,
  Rating.bad,
];

const DefaultFeedbackForm: FC = () => {
  const { addNewBaseFeedback } = useBaseFeedbackStore();

  const methods = useForm<IFormFeedback>({
    defaultValues: {
      benefits: "",
      disadvantages: "",
      comments: "",
      name: "",
      email: "",
      rating: Rating.excellent,
    },
  });

  const { reset, handleSubmit, control } = methods;

  const onSubmit: SubmitHandler<IFormFeedback> = (data) => {
    if (!data) {
      toast.error("Field can`t be is empty");
      return;
    }
    console.log(data);
    addNewBaseFeedback(data);
    reset();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
        <FormControl className="w-full border mb-4">
          <InputLabel id="rating">Оцініть товар</InputLabel>
          <Controller
            name="rating"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
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
        <FormRate />

        <CustomToast />
      </form>
    </FormProvider>
  );
};

export default DefaultFeedbackForm;
