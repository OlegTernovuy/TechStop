"use client";

import Button from "@/components/ProductCard/Button";
import AdminReviews from "@/components/admin/Reviews/Reviews";
import React, { useState } from "react";
import Modal from "@/components/Global/Modal/ModalWindow";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormRate from "@/components/ProductCard/FeedBack/FormRate";
import {
  createReviewsSchema,
  updateReviewsSchema,
} from "@/components/admin/schemas";
import { Rating } from "@/components/ProductCard/FeedBack/Feedback.types";
import { Review } from "@/types";
import { useFeedbackStore } from "@/store/useFeedbackStore";
import { TOAST_MESSAGES } from "@/constants/toastMessages";
import toast from "react-hot-toast";
import withAuth from "@/components/hoc/withAuth";

const { REVIEW_SUCCESS } = TOAST_MESSAGES();

const ReviewsPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [leaveFeedback, setLeaveFeedback] = useState(false);

  const { addNewFeedback } = useFeedbackStore();

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
    formState: { errors },
    handleSubmit,
    reset,
  } = methods;

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const onSubmit: SubmitHandler<Review> = async (data) => {
    const { productId } = data;
    const newData = {
      ...data,
      productId,
      // userId
    };

    const { userEmail, ...filteredData } = newData;

    try {
      await addNewFeedback(filteredData);

      if (leaveFeedback) {
        throw new Error("Ви вже залишили відгук");
      }

      setLeaveFeedback(true);

      toast.success(REVIEW_SUCCESS);
      reset();
    } catch (error) {
      toast.error((error as Error)?.message);
    }
  };

  return (
    <div>
      <h1 className="text-5xl text-TechStopBlue font-bold mb-4">Reviews</h1>
      <Button
        type="button"
        className="text-white bg-slate-900 px-10 py-2 my-4 rounded-full hover:bg-slate-700 "
        onClick={toggleModal}
      >
        Create Review
      </Button>{" "}
      <AdminReviews />
      {modalIsOpen && (
        <Modal onClose={toggleModal}>
          <h2>Create review</h2>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <FormProvider {...methods}>
              <FormRate errors={errors} />
            </FormProvider>
          </form>

          <Button
            onClick={toggleModal}
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          >
            Cancel
          </Button>
        </Modal>
      )}
    </div>
  );
};

export default withAuth(ReviewsPage);
