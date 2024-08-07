"use client";

import React, { SyntheticEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CustomSpinner from "@/components/Global/Spinner/CustomSpinner";
import toast from "react-hot-toast";
import { adminToastMessages } from "@/components/admin/constants/adminToastMessages";
import CustomToast from "@/components/Global/Toaster/CustomToast";
import { signIn, useSession } from "next-auth/react";

const { AUTH_ERROR_CREDENTIALS, AUTH_SUCCESSFULLY } = adminToastMessages();

const LoginPage = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { data } = useSession();

  const userRoles = data?.user?.roles.includes("user");

  useEffect(() => {
    if (userRoles || !data?.token) {
      toast.error(AUTH_ERROR_CREDENTIALS);
      router.push("/admin/login");
      return;
    }
    toast.success(AUTH_SUCCESSFULLY);
    router.push("/admin/dashboard");
  }, [router, data?.token, userRoles]);

  const handleSubmit = async (e: SyntheticEvent) => {
    if (userRoles) {
      toast.error(AUTH_ERROR_CREDENTIALS);
      return;
    }

    try {
      e.preventDefault();

      setIsLoading(true);

      await signIn("credentials", {
        email,
        password,
        callbackUrl: `${userRoles ? "admin/login" : "/admin/dashboard"}`,
      });

      setIsLoading(false);

      toast.success(AUTH_SUCCESSFULLY);
    } catch (error) {
      setIsLoading(false);
      console.log((error as Error).message);
      toast.error((error as Error).message);
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
              className={`w-full mb-2 ${
                isLoading
                  ? "bg-gray-700 cursor-not-allowed"
                  : "bg-blue-500 cursor-pointer"
              }  text-white p-2 rounded`}
            >
              {isLoading ? <CustomSpinner width={20} height={20} /> : "Login"}
            </button>
          </form>
        </div>
        <CustomToast />
      </div>
    </>
  );
};

export default LoginPage;
