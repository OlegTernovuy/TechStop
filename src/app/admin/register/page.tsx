"use client";

import React, { SyntheticEvent, useEffect } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";
import toast from "react-hot-toast";
import { adminToastMessages } from "@/components/admin/constants/adminToastMessages";
import { useAdminAuth } from "@/store/useAdminAuth";
import CustomSpinner from "@/components/Global/Spinner/CustomSpinner";
import CustomToast from "@/components/Global/Toaster/CustomToast";

const { AUTH_ERROR_CREDENTIALS, AUTH_SUCCESSFULLY } = adminToastMessages();

const RegisterPage = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { signUp, isError, isLoading, isLoggedIn } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/admin/dashboard");
    }
  }, [isLoggedIn, router]);

  const handleSubmit = async (e: SyntheticEvent) => {
    try {
      e.preventDefault();

      const resp = await signUp(email, password);

      console.log(resp);

      if (isError) {
        toast.error("OOPS something went wrong");
        alert("OOPS something went wrong");
        throw new Error();
      }

      const user = resp?.user.roles;

      const userRoles = user?.find((item) => item === "user");

      if (userRoles || !resp?.user) {
        toast.error(AUTH_ERROR_CREDENTIALS);
        alert("Unauthorized");
        throw new Error("Unauthorized");
      }

      toast.success(AUTH_SUCCESSFULLY);

      router.push("/admin/login");
    } catch (error) {}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-5xl font-bold mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full text-TechStopBlue p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full text-TechStopBlue p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mb-2 bg-blue-500 text-white p-2 rounded"
          >
            {isLoading ? <CustomSpinner width={20} height={20} /> : "Register"}
          </button>
        </form>

        <Link href="/admin/login" className="text-TechStopBlue">
          Login
        </Link>
      </div>
      <CustomToast />
    </div>
  );
};

export default RegisterPage;
