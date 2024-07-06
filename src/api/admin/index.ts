import axios from "axios";
import { env } from "../../../next.config";
import {
  ICreateCategory,
  ICreateOrderFormValues,
  ICreateProductData,
  IUpdateCategory,
  IUpdateProductFields,
  IUpdateReview,
  UpdatePurchasesData,
} from "@/components/admin/types";

const token = {
  set(token: string) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

const { NEXT_PUBLIC_BASE_URL } = env;

axios.defaults.baseURL = NEXT_PUBLIC_BASE_URL;

interface User {
  email: string;
  password: string;
}

export const signUp = async (user: User) => {
  try {
    const resp = await axios.post("auth/register", user);
    if (resp.status !== 201) {
      throw new Error("Something went wrong");
    }
    token.set(resp.data.token);
    return resp.data;
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const signIn = async (user: User) => {
  try {
    const resp = await axios.post("auth/login", user);
    if (resp.status !== 201) {
      throw new Error("Something went wrong");
    }
    token.set(resp.data.token);
    return resp.data;
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const createProduct = async (product: ICreateProductData) => {
  try {
    const resp = await axios.post("/products", product);

    if (resp.status !== 201) {
      throw new Error("Something went wrong");
    }
    return resp.data;
  } catch (error) {
    console.error("Error creating product:", (error as Error).message);
    throw error;
  }
};

export const updateProduct = async (
  productData: IUpdateProductFields,
  _id: string
) => {
  try {
    const resp = await axios.patch(`/products/${_id}`, productData);

    if (resp.status !== 200) {
      throw new Error("Something went wrong");
    }

    return resp.data;
  } catch (error) {
    console.error("Error creating product:", (error as Error).message);
    throw error;
  }
};

export const uploadPoster = async (formData: FormData, _id: string) => {
  try {
    const resp = await axios.patch(`/products/${_id}/upload-poster`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (resp.status !== 200) {
      throw new Error("Something went wrong");
    }

    return resp.data;
  } catch (error) {
    console.error("Error creating product:", (error as Error).message);
    throw error;
  }
};

export const deleteById = async (_id: string) => {
  try {
    const resp = await axios.delete(`/products/${_id}`);

    if (resp.status !== 200) {
      throw new Error("Something went wrong");
    }

    return resp.data;
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const updateReviewById = async (
  _id: string,
  reviewData: IUpdateReview
) => {
  try {
    const resp = await axios.patch(`/reviews/${_id}`, reviewData);

    if (resp.status !== 200) {
      throw new Error("Something went wrong");
    }

    return resp.data;
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const deleteOrderById = async (orderCode: string) => {
  try {
    const resp = await axios.delete(`/orders/${orderCode}`);

    if (resp.status !== 200) {
      throw new Error("Something went wrong");
    }

    return resp.data;
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const updateOrderById = async (
  orderCode: string,
  orderData: UpdatePurchasesData
) => {
  try {
    const resp = await axios.patch(`/orders/${orderCode}`, orderData);

    if (resp.status !== 200) {
      throw new Error("Something went wrong");
    }

    return resp.data;
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const createOrder = async (orderData: ICreateOrderFormValues) => {
  try {
    const resp = await axios.post(`/orders`, orderData);

    if (resp.status !== 201) {
      throw new Error("Something went wrong");
    }

    return resp.data;
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const getAllCategories = async () => {
  try {
    const resp = await axios.get(`/categories`);

    if (resp.status !== 200) {
      throw new Error("Something went wrong");
    }

    return resp.data;
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const createCategory = async (newCategory: ICreateCategory) => {
  try {
    const resp = await axios.post(`/categories`, newCategory);

    if (resp.status !== 201) {
      throw new Error("Something went wrong");
    }

    return resp.data;
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const updateCategory = async (
  orderData: IUpdateCategory,
  slug: string
) => {
  try {
    const resp = await axios.patch(`/categories/${slug}`, orderData);

    if (resp.status !== 200) {
      throw new Error("Something went wrong");
    }

    return resp.data;
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const deleteCategoryBySlug = async (slug: string) => {
  try {
    const resp = await axios.delete(`/categories/${slug}`);

    if (resp.status !== 200) {
      throw new Error("Something went wrong");
    }

    return resp.data;
  } catch (error) {
    console.log((error as Error).message);
  }
};
