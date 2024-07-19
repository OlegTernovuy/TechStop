"use client";

import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

import { IImage, IProductsListItemProps } from "../types";

import Rating from "../Rating";
import UploadPoster from "../UploadPoster";
import Modal from "@/components/Global/Modal/ModalWindow";
import CustomToast from "@/components/Global/Toaster/CustomToast";
import { useCheckUsers } from "@/components/hooks/useCheckUsers";

import UpdateProductForm from "./UpdateProductForm";
import Button from "@/components/ProductCard/Button";
import UploadCollectionImages from "../UploadCollectionImages";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import CustomSmallInput from "@/components/ProductCard/FeedBack/CustomSmallInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { deleteImageById } from "@/api/admin";
import { getProductById } from "@/api";
import { Product } from "@/types";
import { deleteImageByIdSchema } from "../schemas";

const defaultValues = {
  imageId: 0,
};

const ProductsListItem: FC<IProductsListItemProps> = ({
  listItem,
  idx,
  handleDelete,
}) => {
  const [modalPosterIsOpen, setModalPosterIsOpen] = useState(false);
  const [modalCollectionIsOpen, setModalCollectionIsOpen] = useState(false);
  const [currentProductId, setCurrentProductId] = useState<string | null>(null);
  const [updateModal, setIsUpdateModal] = useState(false);
  const [deleteModal, setIsDeleteModal] = useState(false);
  const [deleteImageModal, setIsDeleteImageModal] = useState(false);
  const [productById, setProductById] = useState<Product | null>(null);

  const { _id, title, poster, price, inStock, rating, categories } = listItem;

  useEffect(() => {
    const getById = async () => {
      const Id = await getProductById(_id);
      setProductById(Id.data);
    };

    getById();
  }, [_id]);

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(deleteImageByIdSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { isUser } = useCheckUsers("user");

  const togglePosterModal = (productId: string | null = null) => {
    if (isUser) {
      toast.error(`You do not have access to change poster`);
      return;
    }

    setCurrentProductId(productId);
    setModalPosterIsOpen(!modalPosterIsOpen);
  };

  const toggleUploadCollection = (productId: string | null = null) => {
    if (isUser) {
      toast.error(`You do not have access to change poster`);
      return;
    }

    setCurrentProductId(productId);
    setModalCollectionIsOpen(!modalCollectionIsOpen);
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

  const toggleDeleteImageModal = (productId: string | null = null) => {
    if (isUser) {
      toast.error(`You do not have access to delete products`);
      return;
    }
    setCurrentProductId(productId);
    setIsDeleteImageModal(!deleteImageModal);
  };

  const onSubmit: SubmitHandler<IImage> = async (data) => {
    if (!data.imageId) {
      toast.error("No data");
      return;
    }

    const { imageId } = data;

    try {
      const itemId =
        productById &&
        productById?.images?.find(
          (item) => Number(item?.imageId) === Number(imageId)
        );

      if (!imageId) {
        toast.error("Id not found");
        return;
      }

      const resp = await deleteImageById(_id, Number(itemId?.imageId));

      if (!resp) {
        throw new Error("Oops something went wrong");
      }

      toast.success(`Image with ID ${imageId} was deleted`);

      toggleDeleteImageModal();
      reset();
    } catch (error) {
      console.log((error as Error).message);
      toast.error((error as Error).message);
    }
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
          <button
            onClick={() => toggleUploadCollection(_id)}
            className="text-white border px-4 py-2 bg-gray-900 hover:bg-gray-700"
            type="button"
          >
            Upload collection
          </button>
          {modalCollectionIsOpen && currentProductId === _id && (
            <Modal
              onClose={() => toggleUploadCollection()}
              maxwidth="600"
              maxheight="900"
            >
              <UploadCollectionImages
                itemId={_id}
                onClose={() => {
                  toggleUploadCollection();
                }}
              />
              <button
                type="button"
                onClick={() => toggleUploadCollection()}
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
          {updateModal && currentProductId === _id && (
            <Modal onClose={() => toggleUpdateModal()} alignitems="flex-start">
              <UpdateProductForm
                toggleUpdateModal={toggleUpdateModal}
                _id={currentProductId}
              />

              <Button
                type="button"
                onClick={() => toggleUpdateModal()}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </Button>
              <CustomToast />
            </Modal>
          )}
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
        <td className="p-3">
          <button
            type="button"
            className="text-white border px-4 py-2 bg-red-900 hover:bg-red-700 "
            onClick={() => toggleDeleteImageModal(_id)}
          >
            Delete image by id
          </button>
        </td>
      </tr>
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
      {deleteImageModal && currentProductId === _id && (
        <Modal onClose={toggleDeleteImageModal}>
          <div className="">
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex items-baseline justify-between gap-2"
              >
                {" "}
                <CustomSmallInput
                  label="ImageId"
                  name="imageId"
                  defaultValue=""
                />
                <button
                  type="submit"
                  className="bg-red-800 text-white px-6 py-4 rounded "
                >
                  Delete
                </button>
              </form>
            </FormProvider>
            {errors.imageId && (
              <p className="text-red-500 ">{errors.imageId?.message}</p>
            )}

            <button
              type="button"
              onClick={() => toggleDeleteImageModal()}
              className="bg-gray-500 text-white px-6 py-4 rounded mr-2"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
      <CustomToast />
    </>
  );
};

export default ProductsListItem;
