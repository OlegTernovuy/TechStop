"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ReactNode, useEffect } from "react";
import HeaderBlockProductsByCategory from "../../HeaderBlockProductsByCategory";
import { usePathname } from "next/navigation";
import FitlersForProducts from "../../FitlersForProducts";
import { useFilterStore } from "@/store/useFiltersStore";

interface ILayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  const pathname = usePathname();

  const { categoryFilter, setCategoryFilter, clearAllFilter } =
    useFilterStore();

  useEffect(() => {
    setCategoryFilter(pathname);
    if (pathname !== categoryFilter) {
      clearAllFilter();
      setCategoryFilter(pathname);
    }
  }, [pathname, categoryFilter, clearAllFilter, setCategoryFilter]);

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
