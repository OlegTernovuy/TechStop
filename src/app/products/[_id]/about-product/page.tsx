import { getProductById } from "@/api";
import ProductCard from "@/components/ProductCard/ProductCard";
import { FC } from "react";
import { IProductCardProps } from "@/components/ProductCard/ProductCard.types";

const AboutPage: FC<IProductCardProps> = async ({ params }) => {
  if (!params) {
    return <div>Loading...</div>;
  }

  const { _id } = params;

  const product = await getProductById(_id);

  return <ProductCard product={product} />;
};

export default AboutPage;
