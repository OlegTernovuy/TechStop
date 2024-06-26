"use client";

import React, { FC, useState } from "react";
import Image from "next/image";
import { FormProvider, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { updateProductSchema } from "../schemas";
import { IProductsListItemProps, IUpdateProductFields } from "../types";

import { updateProduct } from "@/api/admin";
import Rating from "../Rating";
import UploadPoster from "../UploadPoster";
import Modal from "@/components/Global/Modal/ModalWindow";
import CustomToast from "@/components/Global/Toaster/CustomToast";
import UpdateInputsList from "../UpdateInputs/UpdateInputsList";
import Button from "@/components/ProductCard/Button";

const defaultValues = {
  title: "",
  parent: "",
  icon: "",
};

const ProductsListItem: FC<IProductsListItemProps> = ({
  listItem,
  idx,
  handleDelete,
}) => {
  const [modalPosterIsOpen, setModalPosterIsOpen] = useState(false);
  const [currentProductId, setCurrentProductId] = useState<string | null>(null);
  const [updateModal, setIsUpdateModal] = useState(false);
  const [deleteModal, setIsDeleteModal] = useState(false);

  const { _id, title, poster, price, inStock, rating, categories } = listItem;

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(updateProductSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<IUpdateProductFields> = async (data) => {
    try {
      if (!data) {
        toast.error("No data to change");
        return;
      }
      const resp = await updateProduct(data, _id);
      toast.success(resp?.message);
      toggleUpdateModal();
      reset();
    } catch (error) {
      toast.error("Failed to update product");
    }
  };

  const togglePosterModal = (productId: string | null = null) => {
    setCurrentProductId(productId);
    setModalPosterIsOpen(!modalPosterIsOpen);
  };

  const toggleUpdateModal = (productId: string | null = null) => {
    setCurrentProductId(productId);
    setIsUpdateModal(!updateModal);
  };

  const toggleDeleteModal = (productId: string | null = null) => {
    setCurrentProductId(productId);
    setIsDeleteModal(!deleteModal);
  };

  const isError = Object.values(errors).some((error) => error !== undefined);

  return (
    <>
      {" "}
      <tr key={_id} className="even:bg-gray-500 odd:bg-slate-400 text-center">
        <td className="p-3">{idx + 1}</td>
        <td className="p-3">{_id}</td>
        <td className="p-3">{title}</td>
        <td className="p-3">{price}</td>
        <td className="p-3">{inStock ? "Yes" : "No"}</td>
        <td className="p-3">
          {poster ? (
            <Image src={poster} width={100} height={100} alt="" />
          ) : (
            "No poster yet 😔"
          )}
        </td>
        <td className="p-3">
          <Rating rating={rating} />
        </td>
        <td className="p-3">{categories && categories?.map((item) => item)}</td>
        <td>
          {" "}
          <Button
            onClick={() => togglePosterModal(_id)}
            className="text-white border px-4 py-2 bg-yellow-900 hover:bg-yellow-700"
            type="button"
          >
            Upload poster
          </Button>
          {modalPosterIsOpen && currentProductId === _id && (
            <Modal
              onClose={() => togglePosterModal()}
              maxwidth="600"
              maxheight="900"
            >
              <UploadPoster
                itemId={_id}
                onClose={() => {
                  togglePosterModal();
                }}
              />
              <Button
                type="button"
                onClick={() => togglePosterModal()}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </Button>
            </Modal>
          )}
        </td>
        <td>
          {" "}
          <Button
            onClick={() => toggleUpdateModal(_id)}
            className="text-white border px-4 py-2 bg-green-900 hover:bg-green-700"
            type="button"
          >
            Update
          </Button>
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
        </td>
      </tr>
      {updateModal && currentProductId === _id && (
        <Modal onClose={toggleUpdateModal}>
          <h1 className="text-TechStopBlue text-3xl mb-4">Update Product</h1>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <UpdateInputsList errors={errors} />

              <Button
                disabled={!!isError}
                type="submit"
                className={`${
                  isError ? "bg-slate-400 cursor-not-allowed" : "bg-green-500"
                } text-white px-4 py-2 rounded mr-2`}
              >
                Update
              </Button>
            </form>
          </FormProvider>
          <button
            type="button"
            onClick={() => toggleUpdateModal()}
            className="bg-gray-500 text-white ml-auto flex px-4 py-2 rounded "
          >
            Cancel
          </button>
          <CustomToast />
        </Modal>
      )}
      {deleteModal && currentProductId === _id && (
        <Modal onClose={toggleDeleteModal}>
          <h2 className="text-TechStopBlue text-3xl mb-4">
            Do you really want to delete product {title} ?
          </h2>
          <div className="flex justify-center items-center gap-4">
            {" "}
            <Button
              type="button"
              onClick={() => toggleDeleteModal()}
              className="bg-gray-500 text-white px-6 py-4 rounded mr-2"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={() => handleDelete(_id)}
              className="bg-red-800 text-white px-6 py-4 rounded mr-2"
            >
              Delete
            </Button>
          </div>
        </Modal>
      )}
      <CustomToast />
    </>
  );
};

export default ProductsListItem;
