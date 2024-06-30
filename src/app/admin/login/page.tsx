"use client";

import React, { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/api/admin";
import Link from "next/link";
import CustomSpinner from "@/components/Global/Spinner/CustomSpinner";

const LoginPage = () => {
  const [email, setEmail] = React.useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  if (!email || !password) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await signIn({ email, password });
    setIsLoading(false);
    router.push("/admin/dashboard");
  };

  return (
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
            {isLoading ? <CustomSpinner width={20} height={20} /> : "SignIn"}
          </button>
        </form>
        <Link href="/admin/register" className="text-TechStopBlue">
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
