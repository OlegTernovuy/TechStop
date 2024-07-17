import axios from "axios";

import {
  ICreateCategory,
  ICreateOrderFormValues,
  ICreateProductData,
  IUpdateCategory,
  IUpdateProductFields,
  IUpdateReview,
  IUpdateRole,
  UpdatePurchasesData,
} from "@/components/admin/types";
import { env } from "../../../next.config";

const { NEXT_PUBLIC_BASE_URL } = env;

axios.defaults.baseURL = NEXT_PUBLIC_BASE_URL;

export const createProduct = async (product: ICreateProductData) => {
  try {
    const { data } = await axios.post("/products", product);
    return data;
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
    const { data } = await axios.patch(`/products/${_id}`, productData);
    return data;
  } catch (error) {
    console.error("Error creating product:", (error as Error).message);
    throw error;
  }
};

export const uploadPoster = async (formData: FormData, _id: string) => {
  try {
    const { data } = await axios.patch(
      `/products/${_id}/upload-poster`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    return data;
  } catch (error) {
    console.error("Error creating product:", (error as Error).message);
    throw error;
  }
};

export const uploadCollection = async (formData: FormData, _id: string) => {
  try {
    const { data } = await axios.patch(`/products/${_id}/add-image`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return data;
  } catch (error) {
    console.error("Error creating product:", (error as Error).message);
    throw error;
  }
};

export const deleteById = async (_id: string) => {
  try {
    const { data } = await axios.delete(`/products/${_id}`);

    return data;
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const updateReviewById = async (
  _id: string,
  reviewData: IUpdateReview
) => {
  try {
    const { data } = await axios.patch(`/reviews/${_id}`, reviewData);

    return data;
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const deleteOrderById = async (orderCode: string) => {
  try {
    const { data } = await axios.delete(`/orders/${orderCode}`);

    return data;
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const updateOrderById = async (
  orderCode: string,
  orderData: UpdatePurchasesData
) => {
  try {
    const { data } = await axios.patch(`/orders/${orderCode}`, orderData);

    return data;
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const createOrder = async (orderData: ICreateOrderFormValues) => {
  try {
    const resp = await axios.post(`/orders`, orderData);

    if (resp.status !== 201) {
      throw new Error(resp.statusText);
    }

    return resp.data;
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const getAllCategories = async () => {
  try {
    const { data } = await axios.get(`/categories`);

    return data;
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const createCategory = async (newCategory: ICreateCategory) => {
  try {
    const { data } = await axios.post(`/categories`, newCategory);

    return data;
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const updateCategory = async (
  orderData: IUpdateCategory,
  slug: string
) => {
  try {
    const { data } = await axios.patch(`/categories/${slug}`, orderData);

    return data;
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const deleteCategoryBySlug = async (slug: string) => {
  try {
    const { data } = await axios.delete(`/categories/${slug}`);

    return data;
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const getUsers = async () => {
  try {
    const { data } = await axios.get(`/users/`);

    return data;
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const changeRole = async (data: IUpdateRole) => {
  try {
    const { data: respData } = await axios.post(`/users/changeRoles`, data);

    return respData;
  } catch (error) {
    console.log((error as Error).message);
  }
};
