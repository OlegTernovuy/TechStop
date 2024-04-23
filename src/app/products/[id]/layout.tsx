import { getProductById } from "@/api";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductNavList from "@/components/ProductCard/ProductNavList";
import { FC, ReactNode } from "react";

interface ILayoutProps {
  children: ReactNode;
  params: {
    id: string;
  };
}

const Layout: FC<ILayoutProps> = async ({ children, params }) => {
  const { id } = params;

  const response = await getProductById(String(id));

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
