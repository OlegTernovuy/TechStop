"use client";

import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import CustomToast from "../Global/Toaster/CustomToast";
import Button from "../ProductCard/Button";
import { signOut, useSession } from "next-auth/react";
import CustomSpinner from "../Global/Spinner/CustomSpinner";

const AdminHeader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useSession();

  const handleSignOut = async () => {
    setIsLoading(true);
    await signOut({ callbackUrl: "/admin/login" });
    setIsLoading(false);
    toast.success("Logout success");
  };

  const roles = data?.user.roles;

  return (
    <>
      <header className="bg-TechStopWhite p-4 flex justify-between items-center">
        <Link href="/admin/dashboard">
          {" "}
          <h1 className="text-TechStopBlue text-xl">Admin Dashboard</h1>
        </Link>
        <ul>
          <li>
            {" "}
            <p className="text-TechStopBlue">
              You login with email <strong>{data?.user.email}</strong>
            </p>
          </li>
          <li>
            {" "}
            <p className="text-TechStopBlue">
              Your role <strong>{roles && [...roles]}</strong>
            </p>
          </li>
        </ul>
        <Button
          type="button"
          disabled={isLoading}
          onClick={handleSignOut}
          className="bg-TechStopBlue text-white px-4 py-2 rounded hover:bg-blue-900"
        >
          {isLoading ? <CustomSpinner width={20} height={20} /> : "Logout"}
        </Button>
      </header>
      <CustomToast />
    </>
  );
};

export default AdminHeader;
