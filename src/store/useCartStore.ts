import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AddServices, CartProduct, Product } from "../types";

interface CartState {
  cartItems: CartProduct[];
  additionalService: AddServices[];
  addAdditionalServices: (service: AddServices) => void;
  checkAddService: (id: number) => void;
  addItemToCart: (item: Product) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  removeItemFromCart: (productId: number) => void;
}

export const useCartStore = create(
  persist<CartState>(
    (set, get) => ({
      cartItems: [
        /* For testing*/
        {
          id: 1,
          inStock: true,
          poster: "/shoppingCardItemTest.svg",
          price: 19990,
          oldPrice: 28990,
          title: "Дуже довга назва товару з якимись цифрами HTG-7658",
          quantity: 1,
        },
      ],
      additionalService: [],
      addAdditionalServices: (service: AddServices) => {
        const serviceExists = get().additionalService.find(
          (serviceItem) => serviceItem.id === service.id
        );
        set({
          additionalService: [...get().additionalService, { ...service }],
        });

        if (serviceExists) {
          const updateServiceItems = get().additionalService.filter(
            (item) => item.id !== service.id
          );
          set({ additionalService: updateServiceItems });
        }
      },
      checkAddService: (id) => {
        return !!get().additionalService.find((service) => service.id === id);
      },
      addItemToCart: (item) => {
        const itemExists = get().cartItems.find(
          (cartItem) => cartItem.id === item.id
        );

        if (itemExists) {
          itemExists.quantity++;
          set({ cartItems: [...get().cartItems] });
        } else {
          set({ cartItems: [...get().cartItems, { ...item, quantity: 1 }] });
        }
      },
      increaseQuantity: (productId) => {
        const itemExists = get().cartItems.find(
          (cartItem) => cartItem.id === productId
        );
        if (itemExists) {
          itemExists.quantity++;
          set({ cartItems: [...get().cartItems] });
        }
      },
      decreaseQuantity: (productId) => {
        const itemExists = get().cartItems.find(
          (cartItem) => cartItem.id === productId
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
      },
      removeItemFromCart: (productId) => {
        const itemExists = get().cartItems.find(
          (item) => item.id === productId
        );

        if (get().cartItems.length === 1) {
          set({ additionalService: [] });
        }

        if (itemExists) {
          const updateCartItems = get().cartItems.filter(
            (item) => item.id !== productId
          );
          set({ cartItems: updateCartItems });
        }
      },
    }),
    {
      name: "ShoppingCart-items",
    }
  )
);
