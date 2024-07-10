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
import CustomInput from "@/components/ProductCard/FeedBack/CustomInput";
import CustomToast from "@/components/Global/Toaster/CustomToast";
import { useCheckUsers } from "@/components/hooks/useCheckUsers";

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

  const { isUser } = useCheckUsers("user");

  const onSubmit: SubmitHandler<IUpdateProductFields> = async (data) => {
    if (isUser) {
      toast.error(`You do not have access to change products`);
      alert(`You do not have access to change products`);
      return;
    }

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
    if (isUser) {
      toast.error(`You do not have access to change poster`);
      return;
    }

    setCurrentProductId(productId);
    setModalPosterIsOpen(!modalPosterIsOpen);
  };

  const toggleUpdateModal = (productId: string | null = null) => {
    if (isUser) {
      toast.error(`You do not have access to change products`);
      return;
    }

    setCurrentProductId(productId);
    setIsUpdateModal(!updateModal);
  };

  const toggleDeleteModal = (productId: string | null = null) => {
    if (isUser) {
      toast.error(`You do not have access to delete products`);
      return;
    }
    setCurrentProductId(productId);
    setIsDeleteModal(!deleteModal);
  };

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
          <button
            onClick={() => togglePosterModal(_id)}
            className="text-white border px-4 py-2 bg-yellow-900 hover:bg-yellow-700"
            type="button"
          >
            Upload poster
          </button>
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
              <button
                type="button"
                onClick={() => togglePosterModal()}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
            </Modal>
          )}
        </td>
        <td>
          {" "}
          <button
            onClick={() => toggleUpdateModal(_id)}
            className="text-white border px-4 py-2 bg-green-900 hover:bg-green-700"
            type="button"
          >
            Update
          </button>
        </td>
        <td className="p-3">
          {" "}
          <button
            type="button"
            className="text-white border px-4 py-2 bg-red-900 hover:bg-red-700 "
            onClick={() => toggleDeleteModal(_id)}
          >
            Delete
          </button>{" "}
        </td>
      </tr>
      {updateModal && currentProductId === _id && (
        <Modal onClose={toggleUpdateModal}>
          <h1 className="text-TechStopBlue text-3xl mb-4">Update Modal</h1>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CustomInput name="title" label="Title" />
              <CustomInput name="parent" label="Parent" />
              <CustomInput name="icon" label="Icon" />
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              >
                Update
              </button>
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
            <button
              type="button"
              onClick={() => toggleDeleteModal()}
              className="bg-gray-500 text-white px-6 py-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => handleDelete(_id)}
              className="bg-red-800 text-white px-6 py-4 rounded mr-2"
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
      <CustomToast />
    </>
  );
};

export default ProductsListItem;
