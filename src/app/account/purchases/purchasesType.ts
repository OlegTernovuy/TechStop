export interface PurchasesData {
  _id: string;
  orderCode: string;
  executionAt: null;
  totalPrice: number;
  customerPhone: string;
  paymentStatus: string;
  paymentMethod: string;
  products: PurchasesProduct[];
  recepient: PurchasesRecepient;
  deliveryAddress: PurchasesDeliveryAddress;
  createdAt: Date;
  updatedAt: Date;
}

export interface PurchasesDeliveryAddress {
  city: string;
  street: string;
  house: string;
  apartment: number;
}

export interface PurchasesProduct {
  title: string;
  price: number;
  poster: string;
  quantity: number;
  id: number;
  productId: string;
  inStock: boolean;
}

export interface PurchasesRecepient {
  name: string;
  phone: string;
}
