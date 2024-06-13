import React, { FC, ReactNode } from "react";
import dynamic from "next/dynamic";
const AdminPanel = dynamic(() => import("../../components/admin/AdminApp"), {
  ssr: false,
});

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
