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

export interface LoginModalState {
  showLoginModal: boolean;
  setShowLoginModal: () => void;
}

export interface IRating {
  [key: number]: number;
}

export interface ProductInCart {
  _id: string;
  poster: string;
  price: number;
  title: string;
  quantity?: number;
}

export interface ICharacteristic {
  name: string;
  description: string[];
}

export interface Product {
  id: number;
  _id: string;
  inStock: boolean;
  poster: string;
  price: number;
  title: string;
  categories: string[];
  characteristics: ICharacteristic[];
  images: [];
  rating: IRating;
}

export interface IProduct {
  products: Product[];
}

export interface AddServices {
  servicesId: number;
  servicesTitle: string;
  servicesDesc: string;
  servicesPrice: number;
}

export type addAdditionalServices = AddServices & {
  productId: string;
};

// export type CartProduct = Product & {
//   quantity: number;
// } & {
//   addServices?: AddServices[];
// };
export type CartProduct = ProductInCart & {
  quantity: number;
} & {
  addServices?: AddServices[];
};

export type AdditionalServicesDesktopType = {
  // productId: number;
  productId: string;
};

export interface IContactContent
  extends Record<string, string | number | boolean> {
  name: string;
  surname: string;
  email: string;
  phone: string;
  // anotherPersonReceive: boolean;
}

export interface ICourierAddress {
  street: string | undefined;
  house: string | undefined;
  apartment: number | undefined;
}

export interface IDeliveryContent {
  postalOperator: string;
  postalDepartment?: string | undefined;
  courierAddress: {
    street?: string | undefined;
    house?: string | undefined;
    apartment?: number | undefined;
  } | null;
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
  // setCourierAddress: React.Dispatch<React.SetStateAction<{}>>;
  toggle: (i: any) => void;
}

export interface formDatAddress extends formDat {
  setCourierAddress: React.Dispatch<React.SetStateAction<ICourierAddress>>;
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
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  b_day?: string | null | undefined;
}

export interface IPersonalLoginInfo {
  loginPhone: string;
}

export interface IHomeDeliveryAddress {
  city: string;
  street: string;
  house: string;
  apartament?: number | null | undefined;
}

export interface INovaPostDeliveryAddress {
  city: string;
  novaPostDepart: string;
}

export interface IUkrPostDeliveryAddress {
  city: string;
  ukrPostDepart: string;
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
  inStock: boolean;
}

export interface SubcategoryModel {
  id: string;
  name: string;
}

export interface Subcategory {
  id: number;
  name: string;
  model: SubcategoryModel[];
}

export interface Category {
  id: number;
  icon: string;
  title: string;
  subcategories: Subcategory[];
}

//* Product-card types

export interface IParams {
  params: {
    _id: string;
  };
}

export interface IOption {
  id: string;
  name: string;
  label: string;
  price: number;
  idx?: string;
}

export interface IData {
  product: {
    data: Product;
  };
}

export interface Review {
  rating: number;
  advantages: string;
  disadvantages: string;
  comment?: string;
  userEmail?: string;
  userName?: string;
  productId?: string;
  date?: string;
}

export interface User {
  userEmail: string;
  userName: string;
}

export interface Product {
  _id: string;
  title: string;
  price: number;
  inStock: boolean;
  id: number;
  poster: string;
  rating: IRating;
}

export interface IFeedback {
  _id?: string;
  rating: number;
  advantages: string;
  disadvantages: string;
  comment?: string;
  product: Product;
  user: User;
  userId: string;
  createdAt: string;
  updatedAt?: string;
}

export interface IReviewCollection {
  _id: string;
  rating: number;
  advantages: string;
  disadvantages: string;
  comment?: string;
  product: Product;
  user: User;
  createdAt: string;
  updatedAt?: string;
}

export interface IDataWithServices {
  product: {
    data: Product;
  };
  addService: AddServices[];
}

export interface IReviewPersonalAccount {
  id: number;
  icon: string;
  title: string;
}

export interface Categories {
  _id: string;
  title: string;
  slug: string;
  icon: null;
  parent: string;
  children: Categories[];
}

export interface IAuthData {
  email: string;
  password: string;
}

export interface IProductFilters {
  priceFrom: number;
  priceTo: number;
  brand: string[];
}

export interface IFilteredProducts {
  minPrice?: number;
  maxPrice?: number;
  category?: string;
  sort?: string | null;
  search?: string | null;
}
