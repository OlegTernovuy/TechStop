import { getProductById } from "@/api";
import Bestsellers from "@/components/Bestsellers";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import BtnToTop from "@/components/ProductCard/BtnToTop";
import ProductNavList from "@/components/ProductCard/ProductNavList";
import RecommendationList from "@/components/ProductCard/Recommendations/RecommendationList";
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
      <MaxWidthWrapper>
        <RecommendationList title="Також Вас можуть зацікавити" />
        {/* <Bestsellers /> */}
      </MaxWidthWrapper>
      <BtnToTop />
    </>
  );
};

export default Layout;
