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
  title: string;
  onClick?: () => void;
  icon?: boolean;
  disabled?: boolean;
}

export interface CatalogModalState {
  showCatalog: boolean;
  setShowCatalog: () => void;
}

export interface ShoppingCartModalState {
  showShoppingCart: boolean;
  setShowShoppingCart: () => void;
}

export interface Product {
  id: number;
  inStock: boolean;
  poster: string;
  price: number;
  oldPrice: number;
  title: string;
}

export interface AddServices {
  servicesId: number;
  servicesTitle: string;
  servicesDesc: string;
  servicesPrice: number;
}

export type addAdditionalServices = AddServices & {
  productId: number;
};

export type CartProduct = Product & {
  quantity: number;
} & {
  addServices?: AddServices[];
};

export type AdditionalServicesDesktopType = {
  productId: number;
};
