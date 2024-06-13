import React from "react";
import dynamic from "next/dynamic";
import { NextPage } from "next";

const AdminPanel = dynamic(() => import("@/components/admin/AdminApp"), {
  ssr: false,
});

const HomePage: NextPage = () => {
  return <AdminPanel />;
};

export default HomePage;
