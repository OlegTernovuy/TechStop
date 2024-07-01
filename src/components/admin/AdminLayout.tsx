import React from "react";
import AdminSidebar from "./AdminSidebar";

interface IAdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<IAdminLayoutProps> = ({ children }) => {
  return (
    <div className="flex ">
      <AdminSidebar />
      <div className="flex-1 mb-[100%] p-4 bg-gray-100">{children}</div>
    </div>
  );
};

export default AdminLayout;
