import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  AddServices,
  AdditionalServicesDesktopType,
  CartProduct,
  Product,
  ProductInCart,
} from "../types";

interface TotalPrices {
  totalPrice: number;
  totalOldPrice: number;
}

interface CartState {
  cartItems: CartProduct[];
  addAdditionalServices: (
    service: AddServices,
    productId: AdditionalServicesDesktopType
  ) => void;
  addArrayOfAdditionalServices: (
    services: AddServices[],
    productId: string
  ) => void;
  checkAddService: (
    servicesId: number,
    productId: AdditionalServicesDesktopType
  ) => void;
  addItemToCart: (item: ProductInCart) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  removeItemFromCart: (productId: string) => void;
  totalPrice: { totalPrice: number; priceWithAddService: number };
  countTotalPrice: () => void;
  getTotalPriceOneProduct: (product: CartProduct) => TotalPrices;
}

export const useCartStore = create(
  persist<CartState>(
    (set, get) => ({
      cartItems: [],
      totalPrice: {
        totalPrice: 0,
        priceWithAddService: 0,
      },
      countTotalPrice: () => {
        const { cartItems } = get();
        let totalPrice = 0;
        let priceWithAddService = 0;
        cartItems?.forEach((item) => {
          totalPrice += item.price * item.quantity!;
        });
        cartItems?.forEach((item) => {
          item.addServices?.forEach((service) => {
            priceWithAddService += service.servicesPrice;
          });
        });
        set({
          totalPrice: {
            totalPrice: totalPrice,
            priceWithAddService: priceWithAddService + totalPrice,
          },
        });
      },
      getTotalPriceOneProduct: (product): TotalPrices => {
        let totalOldPrice = 0;
        let totalPrice = 0;
        // totalOldPrice = product.oldPrice * product.quantity;
        totalPrice = product.price * product.quantity;
        return { totalPrice, totalOldPrice };
      },
      addAdditionalServices: (service, productId) => {
        const { cartItems } = get();

        const itemIndex = cartItems.findIndex(
          (item) => item._id === productId.productId
        );

        if (itemIndex !== -1) {
          const updatedCartItems = [...cartItems];

          const services = updatedCartItems[itemIndex].addServices;

          if (services) {
            const serviceIndex = services.findIndex(
              (itemService) => itemService.servicesId === service.servicesId
            );

            if (serviceIndex !== -1) {
              services.splice(serviceIndex, 1);
            } else {
              services.push(service);
            }

            set({ cartItems: updatedCartItems });
            get().countTotalPrice();
          }
        }
      },
      addArrayOfAdditionalServices: (servicesToAdd, productId) => {
        const { cartItems } = get();

        const itemIndex = cartItems.findIndex((item) => item._id === productId);

        if (itemIndex !== -1) {
          const updatedCartItems = [...cartItems];

          const services = updatedCartItems[itemIndex].addServices || [];

          servicesToAdd.forEach((service) => {
            const serviceIndex = services.findIndex(
              (itemService) => itemService.servicesId === service.servicesId
            );

            if (serviceIndex !== -1) {
              // Якщо сервіс уже існує, можливо оновити дані про нього або пропустити додавання
              services[serviceIndex] = service; // Оновлення існуючого сервісу, якщо потрібно
            } else {
              services.push(service); // Додавання нового сервісу
            }
          });

          // Оновлення масиву сервісів у кошику
          updatedCartItems[itemIndex].addServices = services;

          set({ cartItems: updatedCartItems });
          get().countTotalPrice();
        }
      },
      checkAddService: (id, productId) => {
        const { cartItems } = get();

        const product = cartItems.find(
          (item) => item._id === productId.productId
        );

        if (!product || !product.addServices) {
          return false;
        }
        return product.addServices.some((service) => service.servicesId === id);
      },

      addItemToCart: (item) => {
        const itemExists = get().cartItems.find(
          (cartItem) => cartItem._id === item._id
        );

        if (itemExists) {
          itemExists.quantity++;
          set({ cartItems: [...get().cartItems] });
        } else {
          set({
            cartItems: [
              ...get().cartItems,
              { ...item, quantity: item.quantity ?? 1, addServices: [] },
            ],
          });
        }
        get().countTotalPrice();
      },
      increaseQuantity: (productId) => {
        const itemExists = get().cartItems.find(
          (cartItem) => cartItem._id === productId
        );
        if (itemExists) {
          itemExists.quantity++;
          set({ cartItems: [...get().cartItems] });
        }
        get().countTotalPrice();
      },
      decreaseQuantity: (productId) => {
        const itemExists = get().cartItems.find(
          (cartItem) => cartItem._id === productId
        );
        if (itemExists) {
          if (itemExists?.quantity === 1) {
            set({ cartItems: [...get().cartItems] });
          } else {
            itemExists.quantity--;
            set({ cartItems: [...get().cartItems] });
          }
        }
        set({ cartItems: [...get().cartItems] });
        get().countTotalPrice();
      },
      removeItemFromCart: (productId) => {
        const itemExists = get().cartItems.find(
          (item) => item._id === productId
        );

        if (itemExists) {
          const updateCartItems = get().cartItems.filter(
            (item) => item._id !== productId
          );
          set({ cartItems: updateCartItems });
        }
        get().countTotalPrice();
      },
    }),
    {
      name: "ShoppingCart-items",
    }
  )
);
