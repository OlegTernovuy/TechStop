import axios from "axios";
import { Categories, Product } from "@/types";
import { PurchasesData } from "@/app/account/purchases/purchasesType";

const BASE_URL = "https://team-project-server-41ev.onrender.com/api";

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

export const getOrders = async (): Promise<PurchasesData[] | undefined> => {
  try {
    const res = await fetch(`${BASE_URL}/orders`, {
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

