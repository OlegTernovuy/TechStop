"use client";
//ff
import Button from "@/components/ProductCard/Button";
import AdminReviews from "@/components/admin/Reviews/Reviews";
import React, { useState } from "react";
import Modal from "@/components/Global/Modal/ModalWindow";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormRate from "@/components/ProductCard/FeedBack/FormRate";
import { updateReviewsSchema } from "@/components/admin/schemas";
import { Rating } from "@/components/ProductCard/FeedBack/Feedback.types";

const ReviewsPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const methods = useForm({
    resolver: yupResolver(updateReviewsSchema),
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
  } = methods;

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <div>
      <h1 className="text-5xl text-TechStopBlue font-bold mb-4">Reviews</h1>
      <p className="text-TechStopBlue text-3xl">Manage your Reviews here.</p>
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

          <FormProvider {...methods}>
            <FormRate errors={errors} />
          </FormProvider>

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

export default ReviewsPage;
