import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductNavList from "@/components/ProductCard/ProductNavList";
import { FC, ReactNode } from "react";

interface ILayoutProps {
  children: ReactNode;
}

const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <>
      <MaxWidthWrapper>
        <ProductNavList />
      </MaxWidthWrapper>
      {children}
    </>
  );
};

export default Layout;
