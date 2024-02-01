// export interface IFooterDataProps {
//   head: string;
//   subHeaders: string[];
// }

export interface NavigationProps {
  nav: boolean;
  handleNav: () => void;
}

export interface ButtonCatalogProps {
  stylesButton?: string;
  title?: string;
  onClick?: () => void;
  icon?: boolean;
  disabled?: boolean;
}

export interface CatalogModalState {
  showCatalog: boolean;
  setShowCatalog: () => void;
}

export interface Product {
  id: number;
  inStock: boolean;
  poster: string;
  price: number;
  oldPrice: number;
  title: string;
}

export type CartProduct = Product & {
  quantity: number;
};

export interface AddServices {
  id: number;
  title: string;
  desc: string;
  servicesPrice: number;
}