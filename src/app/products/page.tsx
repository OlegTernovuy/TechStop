import { getProductById } from "@/api";
import ProductNavList from "@/components/ProductCard/ProductNavList";
import { FC } from "react";

interface IProductProps {
  params: {
    id: string;
  };
}

const Page: FC<IProductProps> = async ({ params }) => {
  const { id } = params;

  await getProductById(id);

  return <ProductNavList params={params} />;
};

export default Page;
