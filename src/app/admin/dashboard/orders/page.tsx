"use client";

import React from "react";
import AdminOrders from "@/components/admin/Orders";
import Button from "@/components/ProductCard/Button";
import Modal from "@/components/Global/Modal/ModalWindow";
import CreateOrderForm from "@/components/admin/Orders/CreateOrder/CreateOrderForm";
import withAuth from "@/components/hoc/withAuth";

const Orders = () => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <div>
      <h1 className="text-5xl text-TechStopBlue font-bold mb-4">Orders</h1>
      <Button
        type="button"
        className="text-white bg-slate-900 px-10 py-2 my-4 rounded-full hover:bg-slate-700 "
        onClick={toggleModal}
      >
        Create Order
      </Button>{" "}
      <AdminOrders />
      {modalIsOpen && (
        <Modal onClose={toggleModal}>
          <h2>Create Order</h2>
          <CreateOrderForm toggleModal={toggleModal} />
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

export default withAuth(Orders);
