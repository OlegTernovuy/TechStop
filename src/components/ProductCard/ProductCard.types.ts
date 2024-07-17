import { IImage } from "@/types";

export interface IProduct {
  data: {
    _id: string;
    title: string;
    price: number;
    inStock: boolean;
    id: number;
    poster: string;
    images: IImage[];
  };
}

export interface IProductCardProps {
  params?: {
    _id: string;
  };
}

export interface IParams {
  params?: {
    _id: string;
  };
}
