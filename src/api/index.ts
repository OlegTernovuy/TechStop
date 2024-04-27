import axios from "axios";
import { Categories, Product } from "@/types";

// const BASE_URL = "http://51.20.18.159/api";
const BASE_URL = "http://16.171.168.92/api";

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

export const getProductsData = async (): Promise<Product[] | undefined> => {
  try {
    const res = await fetch(`${BASE_URL}/products`, {
      next: { revalidate: 10 },
    });
    if (res.status !== 200) {
      throw new Error("Something went wrong");
    }

    return res.json().then((res) => res.data);
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const getCategories = async (): Promise<Categories[] | undefined> => {
  try {
    const res = await fetch(`${BASE_URL}/categories`, {
      next: { revalidate: 10 },
    });
    if (res.status !== 200) {
      throw new Error("Something went wrong");
    }

    return res.json().then((res) => res.data);
  } catch (error) {
    console.log((error as Error).message);
  }
};
