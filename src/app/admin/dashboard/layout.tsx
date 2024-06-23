import AdminLayout from "@/components/admin/AdminLayout";
import { Children } from "@/components/admin/types";
import React, { FC } from "react";

const DashboardLayout: FC<Children> = ({ children }) => (
  <AdminLayout>{children}</AdminLayout>
);

export default DashboardLayout;
