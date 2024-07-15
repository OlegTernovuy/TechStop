"use client";

import { FC } from "react";
import FormControl from "@mui/material/FormControl";
import { InputLabel, MenuItem } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import toast from "react-hot-toast";

import CustomToast from "@/components/Global/Toaster";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFeedbackStore } from "@/store/useFeedbackStore";
import { ratingValues, Rating } from "./Feedback.types";
import { CssSelect } from "@/constants/customStyles";

import FormRate from "./FormRate";
import { Review, IParams } from "@/types";
import { TOAST_MESSAGES } from "@/constants/toastMessages";
import { createReviewsSchema } from "@/components/admin/schemas";
import { useSession } from "next-auth/react";

const MenuProps = {
  PaperProps: {
    style: {
      maxWidth: "100%",
    },
  },
};

const { REVIEW_SUCCESS, ADD_REVIEW_ERROR, AUTH_ERROR } = TOAST_MESSAGES();

const DefaultFeedbackForm: FC<IParams> = ({ params }) => {
  const { _id: productId } = params;

  const { addNewFeedback } = useFeedbackStore();
  const { data: userData } = useSession();

  const methods = useForm({
    resolver: yupResolver(createReviewsSchema),
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

  const userId = userData?.user?._id;

  const isUserHasReviewed = useFeedbackStore(({ hasReviewed }) =>
    hasReviewed(productId, userId as string)
  );

  const onSubmit: SubmitHandler<Review> = async (data) => {
    if (!userData?.token) {
      toast.error(AUTH_ERROR);
      return;
    }

    if (isUserHasReviewed) {
      toast.error(ADD_REVIEW_ERROR);
      return;
    }

    const newData = { ...data, productId, userId };

    const { userEmail, ...filteredData } = newData;

    try {
      await addNewFeedback(filteredData);

      toast.success(REVIEW_SUCCESS);
      reset();
    } catch (error) {
      toast.error((error as Error)?.message);
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
                <CssSelect
                  {...field}
                  {...register("rating")}
                  label="Оцініть товар"
                  labelId="rating"
                  id="rating"
                  MenuProps={MenuProps}
                  input={<OutlinedInput label="Оцініть товар" />}
                >
                  {ratingValues.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </CssSelect>
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
