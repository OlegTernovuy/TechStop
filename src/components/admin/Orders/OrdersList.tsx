"use client";

import React, { useEffect, useState } from "react";
import { getOrders } from "@/api";
import { PurchasesData } from "@/app/account/purchases/purchasesType";
import CustomSpinner from "@/components/Global/Spinner/CustomSpinner";
import ProductsInOrdersList from "./ProductsInOrdersList";
import DeliveryAddressList from "./DeliveryAddressList";
import Button from "@/components/ProductCard/Button";
import Modal from "@/components/Global/Modal/ModalWindow";
import CustomToast from "@/components/Global/Toaster/CustomToast";
import { deleteOrderById } from "@/api/admin";
import toast from "react-hot-toast";
import UpdateOrderForm from "./UpdateOrderForm";
import { adminToastMessages } from "../constants/adminToastMessages";
import { useCheckUsers } from "@/components/hooks/useCheckUsers";

const { DELETE_ORDER_ERROR, DELETE_ORDER_SUCCESS } = adminToastMessages();

const OrdersList = () => {
  const [orders, setOrders] = useState<PurchasesData[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentProductId, setCurrentProductId] = useState<string | null>(null);
  const [currentOrderCode, setCurrentOrderCode] = useState<string>("");
  const [updateModal, setIsUpdateModal] = useState(false);
  const [deleteModal, setIsDeleteModal] = useState(false);

  const { isUser } = useCheckUsers("user");

  useEffect(() => {
    const getAllOrders = async () => {
      setIsLoading(true);
      const orderList = await getOrders();
      setOrders(orderList as []);
      setIsLoading(false);
    };
    getAllOrders();
  }, []);

  const toggleUpdateModal = (
    productId: string | null = null,
    orderCode?: string
  ) => {
    if (isUser) {
      toast.error(`You do not have access to update orders`);
      return;
    }
    setCurrentProductId(productId);
    setCurrentOrderCode(orderCode as string);
    setIsUpdateModal(!updateModal);
  };

  const toggleDeleteModal = (productId: string | null = null) => {
    if (isUser) {
      toast.error(`You do not have access to delete orders`);
      return;
    }
    setCurrentProductId(productId);
    setIsDeleteModal(!deleteModal);
  };

  const handleDeleteOrder = async (orderCode: string) => {
    try {
      setIsLoading(true);
      await deleteOrderById(orderCode);
      const filteredOrders = orders.filter(
        (order) => order.orderCode !== orderCode
      );
      setOrders(filteredOrders);
      toast.success(DELETE_ORDER_SUCCESS);
      setIsLoading(false);
      toggleDeleteModal();
    } catch (error) {
      console.log((error as Error).message);
      setIsLoading(false);
      toast.error(DELETE_ORDER_ERROR);
    }
  };

  return (
    <>
      {isLoading ? (
        <CustomSpinner />
      ) : (
        <>
          {orders.length !== 0
            ? orders?.map(
                (
                  {
                    _id,
                    orderCode,
                    executionAt,
                    totalPrice,
                    customerPhone,
                    recepient,
                    deliveryAddress,
                    paymentStatus,
                    paymentMethod,
                    products,
                    createdAt,
                    updatedAt,
                  },
                  idx
                ) => (
                  <tr
                    key={_id}
                    className="even:bg-gray-500 odd:bg-slate-400 text-center"
                  >
                    <td className="p-3"> {idx + 1}</td>
                    <td className="p-3"> {_id}</td>
                    <td className="p-3"> {orderCode}</td>
                    <td className="p-3"> {executionAt || "Empty"}</td>
                    <td className="p-3"> {totalPrice}</td>
                    <td className="p-3"> {customerPhone}</td>
                    <td className="p-3">
                      <p>{recepient?.name}</p>
                      <p>{recepient?.phone}</p>
                    </td>
                    <td className="p-3">
                      {" "}
                      <ul>
                        <DeliveryAddressList
                          deliveryAddress={deliveryAddress}
                        />
                      </ul>
                    </td>
                    <td className="p-3"> {paymentStatus}</td>
                    <td className="p-3"> {paymentMethod}</td>
                    <td className="p-3">
                      {" "}
                      <ProductsInOrdersList products={products} />
                    </td>
                    <td className="p-3"> {updatedAt.toString()}</td>
                    <td className="p-3"> {createdAt.toString()}</td>
                    <td className="p-3">
                      {" "}
                      <Button
                        onClick={() => toggleUpdateModal(_id)}
                        className="text-white border px-4 py-2 bg-green-900 hover:bg-green-700"
                        type="button"
                      >
                        Update
                      </Button>
                      {updateModal && currentProductId === _id && (
                        <Modal
                          onClose={() => toggleUpdateModal()}
                          maxheight="972"
                          maxwidth="600"
                          alignitems="flex-start"
                        >
                          <h2 className="text-TechStopBlue">Update modal</h2>

                          <UpdateOrderForm currentOrderCode={orderCode} />

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
                            Do you really want delete review with ORDER CODE{" "}
                            {orderCode}
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
                            onClick={() => handleDeleteOrder(orderCode)}
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
              )
            : "Orders is Empty"}
        </>
      )}
    </>
  );
};

export default OrdersList;
