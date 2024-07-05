"use client";

import { useFeedbackStore } from "@/store/useFeedbackStore";
import React, { useEffect, useState } from "react";
import CustomSpinner from "@/components/Global/Spinner/CustomSpinner";
import Button from "@/components/ProductCard/Button";
import Modal from "@/components/Global/Modal/ModalWindow";
import toast from "react-hot-toast";
import CustomToast from "@/components/Global/Toaster/CustomToast";
import { TOAST_MESSAGES } from "@/constants/toastMessages";
import UpdateReviewForm from "./UpdateReviewForm";

const ReviewsList = () => {
  const [currentProductId, setCurrentProductId] = useState<string | null>(null);
  const [updateModal, setIsUpdateModal] = useState(false);
  const [deleteModal, setIsDeleteModal] = useState(false);

  const {
    isLoading,
    reviews,
    getAll,
    deleteFeedback,
    addNewFeedback,
    isError,
  } = useFeedbackStore();

  useEffect(() => {
    const fetchAllReviews = async () => {
      getAll();
    };

    fetchAllReviews();
  }, [getAll]);

  const toggleUpdateModal = (productId: string | null = null) => {
    setCurrentProductId(productId);
    setIsUpdateModal(!updateModal);
  };

  const toggleDeleteModal = (productId: string | null = null) => {
    setCurrentProductId(productId);
    setIsDeleteModal(!deleteModal);
  };

  const { DELETE_REVIEW_ERROR, DELETE_REVIEW_SUCCESS } = TOAST_MESSAGES();

  const handleDeleteReview = async (id: string) => {
    await deleteFeedback(id);

    if (isError) {
      toast.error(DELETE_REVIEW_ERROR);
      return;
    }

    toast.success(DELETE_REVIEW_SUCCESS);
  };

  return (
    <>
      {isLoading ? (
        <CustomSpinner />
      ) : (
        <>
          {reviews &&
            reviews.map(
              (
                {
                  userId,
                  _id,
                  product: { rating },
                  advantages,
                  comment,
                  disadvantages,
                  createdAt,
                },
                idx
              ) => (
                <tr
                  key={_id}
                  className="even:bg-gray-500 odd:bg-slate-400 text-center"
                >
                  <td className="p-3">{idx + 1}</td>
                  <td className="p-3">{_id}</td>
                  <td className="p-3">{createdAt}</td>
                  <td className="p-3">{advantages}</td>
                  <td className="p-3">{disadvantages}</td>
                  <td className="p-3">
                    {comment ? comment : "No comment yet"}
                  </td>
                  <td className="p-3">{userId}</td>
                  <td className="p-3">
                    <Button
                      onClick={() => toggleUpdateModal(_id)}
                      className="text-white border px-4 py-2 bg-green-900 hover:bg-green-700"
                      type="button"
                    >
                      Update
                    </Button>

                    {updateModal && currentProductId === _id && (
                      <Modal onClose={() => toggleUpdateModal()}>
                        <h2 className="text-TechStopBlue">Update modal</h2>

                        <UpdateReviewForm productId={currentProductId} />

                        <Button
                          type="button"
                          onClick={() => toggleUpdateModal()}
                          className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                        >
                          Cancel
                        </Button>
                      </Modal>
                    )}
                    <CustomToast />
                  </td>
                  <td className="p-3">
                    {" "}
                    <Button
                      type="button"
                      className="text-white border px-4 py-2 bg-red-900 hover:bg-red-700 "
                      onClick={() => toggleDeleteModal(_id)}
                    >
                      Delete
                    </Button>{" "}
                    {deleteModal && currentProductId === _id && (
                      <Modal onClose={() => toggleDeleteModal()}>
                        <h2 className="text-TechStopBlue text-3xl mb-4">
                          Do you really want delete review with ID {_id}
                        </h2>

                        <Button
                          type="button"
                          onClick={() => toggleDeleteModal()}
                          className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="button"
                          onClick={() => handleDeleteReview(_id)}
                          className="bg-red-700 text-white px-4 py-2 rounded mr-2"
                        >
                          Delete
                        </Button>
                      </Modal>
                    )}
                    <CustomToast />
                  </td>
                </tr>
              )
            )}
        </>
      )}
    </>
  );
};

export default ReviewsList;
