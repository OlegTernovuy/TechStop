"use client";

import Button from "@/components/ProductCard/Button";
import AdminReviews from "@/components/admin/Reviews/Reviews";
import React, { useState } from "react";
import Modal from "@/components/Global/Modal/ModalWindow";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormRate from "@/components/ProductCard/FeedBack/FormRate";
import { createReviewsSchema } from "@/components/admin/schemas";
import { Rating } from "@/components/ProductCard/FeedBack/Feedback.types";
import { Review } from "@/types";
import { useFeedbackStore } from "@/store/useFeedbackStore";
import { TOAST_MESSAGES } from "@/constants/toastMessages";
import toast from "react-hot-toast";
import withAuth from "@/components/hoc/withAuth";
import { useCheckUsers } from "@/components/hooks/useCheckUsers";

const { REVIEW_SUCCESS } = TOAST_MESSAGES();

const ReviewsPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [leaveFeedback, setLeaveFeedback] = useState(false);

  const { addNewFeedback } = useFeedbackStore();
  const { isUser } = useCheckUsers("user");

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
    if (isUser) {
      toast.error(`You do not have access to create review`);
      return;
    }
    setModalIsOpen(!modalIsOpen);
  };

  const onSubmit: SubmitHandler<Review> = async (data) => {
    const { productId } = data;
    const newData = {
      ...data,
      productId,
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

      <AdminReviews />
    </div>
  );
};

export default withAuth(ReviewsPage);
