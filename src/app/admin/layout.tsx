import React, { FC } from "react";
import { Children } from "@/components/admin/types";
import dynamic from "next/dynamic";

const RootLayout: FC<Children> = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default dynamic(() => Promise.resolve(RootLayout), { ssr: false });
