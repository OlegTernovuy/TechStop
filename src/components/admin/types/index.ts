import { Product, User } from "@/types";
import { FieldErrors } from "react-hook-form";

export interface Children {
  children: React.ReactNode;
}

export interface ICreateProductData {
  title: string;
  price: number;
  categories: string[];
  characteristics: {
    name: string;
    description: string[];
  }[];
  inStock?: boolean;
}

export interface IUploadPosterForm {
  poster: FileList | null;
}

export interface IUpdateProductFields {
  title: string;
  parent?: string;
  icon?: string;
}

export interface IProductsListItemProps {
  idx: number;
  listItem: Product;
  handleDelete: (_id: string) => void;
}

export interface IUpdateInputsErrors {
  errors: FieldErrors<{
    title: string;
    parent?: string;
    icon?: string;
  }>;
}

export interface IUpdateReview {
  rating?: number;
  advantages?: string;
  disadvantages?: string;
  comment?: string;
  product?: Product;
  user?: User;
  userId?: string;
}
