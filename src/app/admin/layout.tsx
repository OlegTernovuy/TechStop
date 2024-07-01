import React, { FC } from "react";
import { Children } from "@/components/admin/types";

const RootLayout: FC<Children> = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
