"use client";

import React, { SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/api/admin";
import Link from "next/link";

const RegisterPage = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  if (!email || !password) {
    return <>Loading...</>;
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await signUp({ email, password });
    router.push("/admin/dashboard");
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
            className="w-full mb-2 bg-blue-500 text-white p-2 rounded"
          >
            Sign Up
          </button>
        </form>

        <Link href="/admin/login" className="text-TechStopBlue">
          Login
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
