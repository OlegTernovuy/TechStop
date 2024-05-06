"use client";

import { FC } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import * as yup from "yup";
import toast from "react-hot-toast";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import CustomToast from "@/components/Global/CustomToast";
import { useFeedbackStore } from "@/store/useFeedbackStore";

const schema = yup.object({
  feedback: yup.string().matches(/^[A-Za-z]+$/i),
});

interface IFeedback {
  feedback: string;
}

const FeedbackForm: FC = () => {
  const { addNewFeedback } = useFeedbackStore();

  const {
    handleSubmit,
    control,
    watch,
    reset,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      feedback: "",
    },
  });

  const onSubmit: SubmitHandler<IFeedback> = (data) => {
    if (!data) {
      toast.error("Field can`t be is empty");
      return;
    }

    addNewFeedback(data);
    reset();
  };

  // console.log(watch("feedback"));

  return (
    <>
      {" "}
      <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
        <Controller
          name="feedback"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              className="w-full"
              label="Залиште свій відгук"
              variant="outlined"
              InputProps={{
                className: "border border-TechStopBlue",
                endAdornment: (
                  <Button
                    type="submit"
                    className="ml-auto font-medium uppercase text-TechStopBlue hover:bg-TechStopBlue60 focus:bg-TechStopBlue60 px-6 py-2"
                  >
                    Залишити відгук
                  </Button>
                ),
              }}
            />
          )}
        />
      </form>
      <CustomToast />
    </>
  );
};

export default FeedbackForm;
