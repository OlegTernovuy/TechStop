import React from "react";
import dynamic from "next/dynamic";
const AdminPanel = dynamic(() => import("../../components/admin/AdminApp"), {
  ssr: false,
});

const Layout = () => {
  return (
    <>
      <AdminPanel />
    </>
  );
};

export default Layout;
