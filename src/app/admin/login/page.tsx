"use client";

import React, { SyntheticEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CustomSpinner from "@/components/Global/Spinner/CustomSpinner";
import toast from "react-hot-toast";
import { adminToastMessages } from "@/components/admin/constants/adminToastMessages";
import { useAdminAuth } from "@/store/useAdminAuth";
import CustomToast from "@/components/Global/Toaster/CustomToast";

const { AUTH_ERROR_CREDENTIALS, AUTH_SUCCESSFULLY } = adminToastMessages();

const LoginPage = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const { signIn, isLoading, isError, isLoggedIn } = useAdminAuth();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/admin/dashboard");
    }
  }, [isLoggedIn, router]);

  const handleSubmit = async (e: SyntheticEvent) => {
    try {
      e.preventDefault();

      const resp = await signIn(email, password);

      if (isError) {
        toast.error("OOPS something went wrong");
        return;
      }

      if (isLoggedIn) {
        router.push("/admin/dashboard");
      }

      const user = resp?.data?.user.roles;

      const userRoles = user?.find((item) => item === "user");

      if (userRoles || !resp?.data?.user) {
        toast.error(AUTH_ERROR_CREDENTIALS);
        alert("Unauthorized");
        throw new Error("Unauthorized");
      }

      toast.success(AUTH_SUCCESSFULLY);

      router.push("/admin/dashboard");
    } catch (error) {
      // alert("Unauthorized");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-5xl font-bold mb-6">Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-TechStopBlue p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-TechStopBlue p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mb-2 bg-blue-500 text-white p-2 rounded"
            >
              {isLoading ? <CustomSpinner width={20} height={20} /> : "Login"}
            </button>
          </form>
          <Link href="/admin/register" className="text-TechStopBlue">
            Register
          </Link>
        </div>
      </div>
      <div style={{ zIndex: 10000000000000 }}>
        {" "}
        <CustomToast />
      </div>
    </>
  );
};

export default LoginPage;
