"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import HeaderBlockProductsByCategory from "@/app/(categoriesProducts)/HeaderBlockProductsByCategory";
import FitlersForProducts from "@/app/(categoriesProducts)/FitlersForProducts";

interface ILayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  const pathname = usePathname();

  return (
    <>
      <HeaderBlockProductsByCategory pathname={pathname} />
      <MaxWidthWrapper>
        <div className="flex">
          <FitlersForProducts />
          {children}
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default Layout;
