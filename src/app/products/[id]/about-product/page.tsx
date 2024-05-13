import { getProductById } from "@/api";
import ProductCard from "@/components/ProductCard/ProductCard";
import { FC } from "react";
import { IProductCardProps } from "@/components/ProductCard/ProductCard.types";

const AboutPage: FC<IProductCardProps> = async ({ params }) => {
  if (!params) {
    return <div>Loading...</div>;
  }

  const { id } = params;
console.log(id);

  const product = await getProductById(id);
  console.log(product);
  

  return <ProductCard product={product} />;
};

export default AboutPage;
