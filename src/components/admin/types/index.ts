import { Product } from "@/types";

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
