"use client";

import React from "react";
import Link from "next/link";
import { useAdminAuth } from "@/store/useAdminAuth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import CustomToast from "../Global/Toaster/CustomToast";
import CustomSpinner from "../Global/Spinner/CustomSpinner";
import Button from "../ProductCard/Button";

const AdminHeader = () => {
  const { email, roles, signOut, isLoading } = useAdminAuth();

  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    toast.success("Logout success");
    router.push("/admin/login");
  };

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
              You login with email <strong>{email}</strong>
            </p>
          </li>
          <li>
            {" "}
            <p className="text-TechStopBlue">
              Your role <strong>{...roles}</strong>
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
