import { FC } from "react";
// import { IProductCardProps } from "@/components/ProductCard/ProductCard.types";
import AboutPage from "./about-product/page";
import { IProductCardProps } from "@/components/ProductCard/ProductCard.types";
// import { getProductById } from "../page";

const Page: FC<IProductCardProps> = ({ product, params }) => {
  return <AboutPage product={product} params={params} />;
};

export default Page;
