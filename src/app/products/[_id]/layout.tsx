import { getProductById } from "@/api";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductNavList from "@/components/ProductCard/ProductNavList";
import { FC, ReactNode } from "react";

interface ILayoutProps {
  children: ReactNode;
  params: {
    _id: string;
  };
}

const Layout: FC<ILayoutProps> = async ({ children, params }) => {
  const { _id } = params;

  const response = await getProductById(String(_id));

  return (
    <>
      <MaxWidthWrapper>
        <ProductNavList params={response} />
      </MaxWidthWrapper>
      {children}
    </>
  );
};

export default Layout;
