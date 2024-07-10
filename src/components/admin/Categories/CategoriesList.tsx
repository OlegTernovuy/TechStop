"use client";

import { FC, useEffect, useState } from "react";
import { deleteCategoryBySlug, getAllCategories } from "@/api/admin";
import { ICategory } from "../types";
import CustomSpinner from "@/components/Global/Spinner/CustomSpinner";
import CategoryChildren from "./CategoryChildren";
import Button from "@/components/ProductCard/Button";
import { adminToastMessages } from "../constants/adminToastMessages";
import toast from "react-hot-toast";
import Modal from "@/components/Global/Modal/ModalWindow";
import CustomToast from "@/components/Global/Toaster/CustomToast";
import UpdateCategoryForm from "./UpdateCategoryForm";
import { useCheckUsers } from "@/components/hooks/useCheckUsers";

const CategoriesList: FC = () => {
  const [categories, setCategories] = useState<ICategory[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState<string | null>(
    null
  );
  const [updateModal, setIsUpdateModal] = useState(false);
  const [deleteModal, setIsDeleteModal] = useState(false);
  const [isError, setIsError] = useState<Error | null>(null);

  const { isUser } = useCheckUsers("user");

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        setIsLoading(true);
        const categoriesList = await getAllCategories();

        setCategories(categoriesList?.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(error as Error);
      }
    };

    fetchAllCategories();
  }, []);

  const toggleUpdateModal = (categoryID: string | null = null) => {
    if (isUser) {
      toast.error(`You do not have access to update categories`);
      alert(`You do not have access to change to update categories`);
      return;
    }
    setCurrentCategoryId(categoryID);
    setIsUpdateModal(!updateModal);
  };

  const toggleDeleteModal = (categoryID: string | null = null) => {
    if (isUser) {
      toast.error(`You do not have access to delete categories`);
      alert(`You do not have access to change to delete categories`);
      return;
    }
    setCurrentCategoryId(categoryID);
    setIsDeleteModal(!deleteModal);
  };

  const { DELETE_CATEGORY_ERROR, DELETE_CATEGORY_SUCCESS } =
    adminToastMessages();

  const handleDeleteOrder = async (slug: string) => {
    try {
      setIsLoading(true);
      await deleteCategoryBySlug(slug);

      if (isError) {
        toast.error(DELETE_CATEGORY_ERROR);
        return;
      }

      const filteredCategories = categories.filter(
        (order) => order.slug !== slug
      );

      setCategories(filteredCategories);
      toast.success(DELETE_CATEGORY_SUCCESS);
      setIsLoading(false);
      toggleDeleteModal();
    } catch (error) {
      console.log((error as Error).message);
      setIsLoading(false);
      setIsError(error as Error);
      toast.error(isError?.message ?? DELETE_CATEGORY_ERROR);
    }
  };

  return (
    <>
      {isLoading ? (
        <CustomSpinner />
      ) : (
        <>
          {categories &&
            categories.map(
              (
                { title, parent, icon, children: categoryChildren, _id, slug },
                idx
              ) => (
                <tr
                  key={idx}
                  className="even:bg-gray-500 odd:bg-slate-400 text-center"
                >
                  <td className="p-3">{idx + 1}</td>
                  <td className="p-3">{_id}</td>
                  <td className="p-3">{title}</td>
                  <td className="p-3">{slug}</td>
                  <td className="p-3">{icon || "Empty"}</td>
                  <td className="p-3">{parent || "Empty"}</td>
                  <td className="p-3">
                    {categoryChildren &&
                      categoryChildren?.map(
                        ({
                          _id,
                          icon,
                          slug,
                          title,
                          parent,
                          children: categoryChildren,
                        }) => (
                          <li
                            key={_id}
                            className="border border-TechStopBlue rounded-md p-4 mb-2"
                          >
                            <p>
                              {" "}
                              <strong className="text-TechStopBlue">
                                ID -
                              </strong>{" "}
                              {_id}
                            </p>
                            <p>
                              {" "}
                              <strong className="text-TechStopBlue">
                                ICON -
                              </strong>{" "}
                              {icon || "Empty"}
                            </p>
                            <p>
                              <strong className="text-TechStopBlue">
                                SLUG -
                              </strong>{" "}
                              {slug}
                            </p>
                            <p>
                              {" "}
                              <strong className="text-TechStopBlue">
                                TITLE -
                              </strong>{" "}
                              {title}
                            </p>
                            <p>
                              {" "}
                              <strong className="text-TechStopBlue">
                                PARENT -
                              </strong>{" "}
                              {parent}
                            </p>
                            <p>
                              <CategoryChildren
                                categoryChildren={categoryChildren}
                              />
                            </p>
                          </li>
                        )
                      )}
                  </td>
                  <td className="p-3">
                    <Button
                      type="button"
                      className="text-white border px-4 py-2 bg-green-900 hover:bg-green-700"
                      onClick={() => toggleUpdateModal(_id)}
                    >
                      Update
                    </Button>
                    {updateModal && currentCategoryId === _id && (
                      <Modal onClose={() => toggleUpdateModal()}>
                        <h2 className="text-TechStopBlue">Update modal</h2>

                        <UpdateCategoryForm
                          slug={slug}
                          toggleUpdateModal={toggleUpdateModal}
                        />

                        <Button
                          type="button"
                          onClick={() => toggleUpdateModal()}
                          className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                        >
                          Cancel
                        </Button>
                      </Modal>
                    )}
                  </td>
                  <td className="p-3">
                    <Button
                      type="button"
                      className="text-white border px-4 py-2 bg-red-900 hover:bg-red-700 "
                      onClick={() => toggleDeleteModal(_id)}
                    >
                      DELETE
                    </Button>

                    {deleteModal && currentCategoryId === _id && (
                      <Modal onClose={() => toggleDeleteModal()}>
                        <h2 className="text-TechStopBlue text-3xl mb-4">
                          Do you really wanna delete category with SLUG{" "}
                          <strong>{slug}</strong>
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
                          onClick={() => handleDeleteOrder(slug)}
                          className="bg-red-700 text-white px-4 py-2 rounded mr-2"
                        >
                          Delete
                        </Button>
                      </Modal>
                    )}
                  </td>
                </tr>
              )
            )}
          <CustomToast />
        </>
      )}
    </>
  );
};

export default CategoriesList;
