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

export interface UpdatePurchasesData {
  _id?: string;
  orderCode?: string;
  executionAt?: null;
  totalPrice?: number;
  customerPhone?: string;
  paymentStatus?: string;
  paymentMethod?: string;
  products?: UpdatePurchasesProduct[];
  recepient?: UpdatePurchasesRecepient;
  deliveryAddress?: UpdatePurchasesDeliveryAddress;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UpdatePurchasesDeliveryAddress {
  city?: string;
  street?: string;
  house?: string;
  apartment?: number;
}

export interface UpdatePurchasesProduct {
  title?: string;
  price?: number;
  poster?: string;
  quantity?: number;
  productId?: string;
}

export interface UpdatePurchasesRecepient {
  name?: string;
  phone?: string;
}

export interface IUpdateOrderFormValues {
  email?: string;
  orderStatus?: string;
  customerPhone?: string;
  totalPrice?: number;
  paymentStatus?: string;
  paymentMethod?: string;
  products?: UpdatePurchasesData[];
  recepient?: {
    name?: string;
    phone?: string;
  };
  deliveryAddress?: {
    city?: string;
    postalOperator?: string;
    postalDepartment?: string;
    personalAddress?: {
      street?: string;
      house?: string;
      apartment?: number;
    };
  };
}
