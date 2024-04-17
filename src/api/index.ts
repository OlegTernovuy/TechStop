import { Product } from "@/types";

const BASE_URL = "http://13.53.200.86:5001/api";

export const getProductsData = async (): Promise<Product[] | undefined> => {
    try {
      const res = await fetch(`${BASE_URL}/products`, {
        next: { revalidate: 10 },
      });
      if (res.status !== 200) {
        throw new Error("Something went wrong");
      }
  
      return res.json().then(res => res.data);
    } catch (error) {
      console.log((error as Error).message);
    }
  };
