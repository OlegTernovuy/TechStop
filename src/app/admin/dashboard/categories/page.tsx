"use client";

import Modal from "@/components/Global/Modal/ModalWindow";
import Button from "@/components/ProductCard/Button";
// import Categories from "@/components/admin/Categories";
import CreateCategoryForm from "@/components/admin/Categories/CreateCategoryForm";
import React, { useState } from "react";

const CategoriesPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <>
      <h1 className="text-5xl text-TechStopBlue font-bold mb-4">Categories</h1>
      <p className="text-TechStopBlue text-3xl">Manage your categories</p>
      <Button
        type="button"
        className="text-white bg-slate-900 px-10 py-2 my-4 rounded-full hover:bg-slate-700 "
        onClick={toggleModal}
      >
        Create category
      </Button>
      {modalIsOpen && (
        <Modal onClose={toggleModal}>
          <h2>Create modal</h2>
          {/* <CreateCategoryForm toggleModal={toggleModal} /> */}
          <Button
            type="button"
            onClick={toggleModal}
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          >
            Cancel
          </Button>
        </Modal>
      )}

      {/* <Categories /> */}
    </>
  );
};

export default CategoriesPage;
