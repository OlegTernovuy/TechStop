import React, { FC } from "react";
import { Children } from "@/components/admin/types";

const RootLayout: FC<Children> = ({ children }) => {
  return <div>{children}</div>;
};

export default RootLayout;
