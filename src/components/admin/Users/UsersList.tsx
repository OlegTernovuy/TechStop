"use client";

import React from "react";
import { getUsers } from "@/api/admin";
import { IUserData } from "@/components/admin/types";
import { useEffect, useState } from "react";
import CustomSpinner from "@/components/Global/Spinner/CustomSpinner";
import Button from "@/components/ProductCard/Button";
import Modal from "@/components/Global/Modal/ModalWindow";
import CustomToast from "@/components/Global/Toaster/CustomToast";
import { adminToastMessages } from "../constants/adminToastMessages";
import UpdateUserForm from "./UpdateUserForm";

const UsersList = () => {
  const [users, setUser] = useState<IUserData[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [updateModal, setIsUpdateModal] = useState(false);
  const [deleteModal, setIsDeleteModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const resp = await getUsers();
        setUser(resp.data);
        setIsLoading(false);
      } catch (error) {
        console.log((error as Error).message);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const toggleUpdateModal = (productId: string | null = null) => {
    setCurrentUserId(productId);
    setIsUpdateModal(!updateModal);
  };

  const { DELETE_USER_ERROR, DELETE_USER_SUCCESS } = adminToastMessages();

  return (
    <>
      {isLoading ? (
        <CustomSpinner />
      ) : (
        <>
          {users &&
            users.map(({ _id, email, createdAt, updatedAt, roles }, idx) => (
              <tr
                key={_id}
                className="even:bg-gray-500 odd:bg-slate-400 text-center"
              >
                <td className="p-3">{idx + 1}</td>{" "}
                <td className="p-3">{_id}</td>
                <td className="p-3">{email}</td>
                <td className="p-3">{...roles}</td>
                <td className="p-3">{createdAt}</td>
                <td className="p-3">{updatedAt}</td>
                <td className="p-3">
                  <Button
                    onClick={() => toggleUpdateModal(_id)}
                    className="text-white border px-4 py-2 bg-green-900 hover:bg-green-700"
                    type="button"
                  >
                    Update
                  </Button>

                  {updateModal && currentUserId === _id && (
                    <Modal onClose={() => toggleUpdateModal(currentUserId)}>
                      <UpdateUserForm userId={currentUserId} />

                      <Button
                        type="button"
                        onClick={() => toggleUpdateModal()}
                        className="bg-gray-500 text-white px-4 py-2 rounded mr-2 mt-4"
                      >
                        Cancel
                      </Button>
                    </Modal>
                  )}
                  <CustomToast />
                </td>
              </tr>
            ))}
        </>
      )}
    </>
  );
};

export default UsersList;
