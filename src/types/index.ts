// export interface IFooterDataProps {
//   head: string;
//   subHeaders: string[];
// }

export interface NavigationProps {
  nav: boolean;
  handleNav: () => void;
}

export interface ButtonProps {
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

export interface IDeliveryContent {
  // extends Record<string, string | number | boolean> {
  postOffice: string;
  novaPostDepart?: string | undefined;
  ukrPostDepart?: string | undefined;
  shopDepart?: string | undefined;
  courierAddress?: string | undefined;
  // postOfficeData: string;
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

export interface IPersonalContactInfo {
  name: string;
  surname: string;
  phone: string;
  email: string;
  birthdate?: string | null;
}

export interface IPersonalLoginInfo {
  loginPhone: string;
}

export interface IHomeDeliveryAddress {
  city: string;
  street: string;
  houseNumber: string;
  appartamentNumber?: string | undefined;
}

export interface IInfoAboutPurchase {
  productId: number;
  orderNumber: string;
  orderStatus: string;
  orderDate: string;
  orderIcon: string;
  orderTitle: string;
  orderPrice: number;
  orderCount: number;
  paymentStatus: string;
  PaymentMethod: string;
  deliveryAddress: string;
  orderRecipientName: string;
  orderRecipientPhone: string;
  inStock: boolean,
}

// types/index.ts
// export interface Category {
//   id: number;
//   slug: string;
//   name: string;
//   subcategories: string[];
// }

// data/categories.ts
export interface Subcategory {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  icon: string;
  title: string;
  subcategories: Subcategory[];
}

// const categories: Category[] = [
//   { id: 1, name: 'Електроніка', subcategories: [{ id: 101, name: 'Мобільні телефони' }, { id: 102, name: 'Ноутбуки' }] },
//   { id: 2, name: 'Книги', subcategories: [{ id: 201, name: 'Фантастика' }, { id: 202, name: 'Навчальна література' }] }
// ];

// export default categories;
