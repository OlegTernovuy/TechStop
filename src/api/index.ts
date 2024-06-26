import axios from "axios";
import {
  Categories,
  IFilteredProducts,
  ISearchedProducts,
  Product,
} from "@/types";
import { PurchasesData } from "@/app/account/purchases/purchasesType";
import { IRewiewData } from "@/app/account/reviews/typeRewiew";

import { env } from "../../next.config";

const { NEXT_PUBLIC_BASE_URL } = env;
console.log(NEXT_PUBLIC_BASE_URL);
axios.defaults.baseURL = NEXT_PUBLIC_BASE_URL;

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

export const getProductsData = async (): Promise<Product[] | undefined> => {
  try {
    const res = await fetch(`${NEXT_PUBLIC_BASE_URL}/products`, {
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

export const getProductsByQuery = async (
  filters: IFilteredProducts
): Promise<Product[] | undefined> => {
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_BASE_URL}/products?category=${filters.category}`,
      {
        next: { revalidate: 10 },
      }
    );

    if (res.status !== 200) {
      throw new Error("Something went wrong");
    }

    return res.json().then((res) => res.data);
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const searchedProducts = async (
  filters: ISearchedProducts,
  req?: any
): Promise<Product[] | undefined> => {
  try {
    // const url = new URLSearchParams()
    const res = await fetch(
      `${NEXT_PUBLIC_BASE_URL}/products/search?search=${filters.search}&category=kruti-smartfoni`,
      {
        next: { revalidate: 10 },
      }
    );

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
    const res = await fetch(`${NEXT_PUBLIC_BASE_URL}/categories`, {
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
    const res = await fetch(`${NEXT_PUBLIC_BASE_URL}/orders`, {
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

  // const res = await fetch(
  //   process.env.NEXT_PUBLIC_BASE_URL + "/auth/me",
  //   {
  //     method: "PATCH",
  //     body: JSON.stringify({
  //      ...body
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Authorization": `Bearer ${token}`,
  //     },
  //   }
  // );
  // if (res.status === 200) {
  //   try {
  //     const user = await res.json();
  //     return user.data;
  //   } catch (error) {
  //     console.error("Error parsing response:", error);
  //     return null;
  //   }
  // } else {
  //   try {
  //     const errorResponse = await res.json();
  //     return { error: errorResponse.message };
  //   } catch (error) {
  //     console.error("Error parsing error response:", error);
  //   }
  //   return null;
  // }
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
