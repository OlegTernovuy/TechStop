"use client";

import { useState } from "react";
import AdminOrders from "@/components/admin/Orders";
import Button from "@/components/ProductCard/Button";
import Modal from "@/components/Global/Modal/ModalWindow";
import CreateOrderForm from "@/components/admin/Orders/CreateOrder/CreateOrderForm";

const Orders = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <div>
      Orders
      <h1 className="text-5xl text-TechStopBlue font-bold mb-4">Orders</h1>
      <p className="text-TechStopBlue text-3xl">Manage your Orders here.</p>
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

export default Orders;
