import { getProductById } from "@/api";
import ProductNavList from "@/components/ProductCard/ProductNavList";
import { Product } from "@/types";
import { FC } from "react";

interface IProductProps {
  params: {
    id: string;
    data: Product;
  };
}

const Page: FC<IProductProps> = async ({ params }) => {
  const { id } = params;

  await getProductById(id);

  return <ProductNavList params={params} />;
};

export default Page;
