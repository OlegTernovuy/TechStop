import axios from "axios";
import { Categories, IFilteredProducts, Product, ProductsInfo } from "@/types";
import { PurchasesData } from "@/app/account/purchases/purchasesType";
import { IRewiewData } from "@/app/account/reviews/typeRewiew";

import { env } from "../../next.config";

const { NEXT_PUBLIC_BASE_URL } = env;

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const getProductById = async (_id: string): Promise<Product | any> => {
  try {
    const res = await axios.get(`/products/${_id}`);
    if (res.status !== 200) {
      throw new Error("Something went wrong");
    }

    return res.data as Product;
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const getReviews = async () => {
  try {
    const res = await axios.get(`/reviews`);
    if (res.status !== 200) {
      throw new Error("Something went wrong");
    }

    return res.data;
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const rateProduct = async (_id: string, value: number) => {
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${_id}/rate`,
      {
        value: value,
      }
    );

    return res.data;
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const getProductsData = async (): Promise<ProductsInfo | undefined> => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/products`);

    if (res.status !== 200) {
      throw new Error("Something went wrong");
    }

    return res.data.data;
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const getProductsByQuery = async (
  filters: IFilteredProducts
): Promise<ProductsInfo | undefined> => {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/products`);
    const params = new URLSearchParams();

    (Object.keys(filters) as (keyof IFilteredProducts)[]).forEach((key) => {
      const value = filters[key];
      if (value !== undefined && value !== null && value !== 0) {
        params.append(key, String(value));
      }
    });

    const res = await axios.get(`${url}?${params.toString()}`);

    if (res.status !== 200) {
      throw new Error("Something went wrong");
    }

    return res.data.data;
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const getCategories = async (): Promise<Categories[] | undefined> => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/categories`);
    if (res.status !== 200) {
      throw new Error("Something went wrong");
    }
    
    return res.data.data;
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const getOrders = async (
  userEmail: string
): Promise<PurchasesData[] | undefined> => {
  try {
    const res = await axios.get(`/orders?email=${userEmail}`);
    if (res.status !== 200) {
      throw new Error("Something went wrong");
    }

    return res.data.data as PurchasesData[];
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const getOrderList = async (): Promise<PurchasesData[] | undefined> => {
  try {
    const res = await axios.get(`/orders`);
    if (res.status !== 200) {
      throw new Error("Something went wrong");
    }

    return res.data.data;
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const getAllFeedbacks = async (userId: string) => {
  try {
    const res = await axios.get(`/reviews?userId=${userId}`);
    if (res.status !== 200) {
      throw new Error("Something went wrong");
    }
    return res.data.data as IRewiewData[];
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const getMe = async (token: string) => {
  try {
    const res = await axios.get(`/auth/me`, {
      headers: {
        withCredentials: true,
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status !== 200) {
      throw new Error("Something went wrong");
    }
    return res.data.data;
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const editMe = async (token: string, body: any) => {
  try {
    const res = await axios.patch(
      `/auth/me`,
      {
        ...body,
      },
      {
        headers: {
          withCredentials: true,
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status !== 200) {
      throw new Error("Something went wrong");
    }

    return res.data.data;
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const makeOrder = async (body: any) => {
  try {
    const res = await axios.post(`/orders`, {
      ...body,
    });
    if (res.status !== 201) {
      throw new Error("Something went wrong");
    }
    return res.data;
  } catch (error) {
    console.log((error as Error).message);
  }
};
