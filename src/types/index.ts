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

export interface IContactContent
  extends Record<string, string | number | boolean> {
  name: string;
  email: string;
  phone: string;
  anotherPersonReceive: boolean;
}

export interface IDeliveryContent
  extends Record<string, string | number | boolean> {
  postOffice: string;
}

export interface IPayMethodContent
  extends Record<string, string | number | boolean> {
  // payMethod_id: number;
  payMethod_id: string;
}

export interface IAdd {
  [key: string]: string;
}

export interface formDat {
  setOrderContactData: React.Dispatch<React.SetStateAction<IAdd>>;
  toggle: (i: any) => void;
}

export interface INPCity {
  AddressDeliveryAllowed: boolean;
  Area: string;
  DeliveryCity: string;
  MainDescription: string;
  ParentRegionCode: string;
  ParentRegionTypes: string;
  Present: string;
  Ref: string;
  Region: string;
  RegionTypes: string;
  RegionTypesCode: string;
  SettlementTypeCode: string;
  StreetsAvailability: boolean;
  Warehouses: number;
}
