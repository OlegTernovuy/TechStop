import ProductNavList from "@/components/ProductCard/ProductNavList";
import { Product } from "@/types";
import axios from "axios";
import { FC } from "react";

const BASE_URL = "http://13.53.200.86:5001/api";

export const getProductById = async (id: string): Promise<Product | any> => {
  try {
    const res = await axios.get(`${BASE_URL}/products/${id}`);
    if (res.status !== 200) {
      throw new Error("Something went wrong");
    }

    return res.data as Product;
  } catch (error) {
    console.log((error as Error).message);
  }
};

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
