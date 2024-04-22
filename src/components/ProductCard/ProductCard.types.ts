interface Product {
  data: {
    _id: string;
    title: string;
    price: number;
    inStock: boolean;
    id: number | string;
    poster: string;
  };
}

export interface IProductCardProps {
  params?: {
    id: string;
  };
}

export interface IParams {
  params: {
    id: string;
  };
}
