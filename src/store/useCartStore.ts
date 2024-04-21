import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  AddServices,
  AdditionalServicesDesktopType,
  CartProduct,
  Product,
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
  checkAddService: (
    servicesId: number,
    productId: AdditionalServicesDesktopType
  ) => void;
  addItemToCart: (item: Product) => void;
  toggleProductCardToFavorites: (id: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  removeItemFromCart: (productId: number) => void;
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
          (item) => item.id === productId.productId
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
      checkAddService: (id, productId) => {
        const { cartItems } = get();

        const product = cartItems.find(
          (item) => item.id === productId.productId
        );

        if (!product || !product.addServices) {
          return false;
        }
        return product.addServices.some((service) => service.servicesId === id);
      },

      addItemToCart: (item) => {
        const itemExists = get().cartItems.find(
          (cartItem) => cartItem.id === item.id
        );

        if (itemExists) {
          itemExists.quantity++;
          set({ cartItems: [...get().cartItems] });
        } else {
          set({
            cartItems: [
              ...get().cartItems,
              { ...item, quantity: 1, addServices: [] },
            ],
          });
        }
        get().countTotalPrice();
      },
      toggleProductCardToFavorites: (id: number) => {
        const { cartItems } = get();

        const isFavorites = (id: number) =>
          cartItems.some((item) => item.id === id);

        if (isFavorites(id)) {
          set((state) => ({
            cartItems: state.cartItems.filter((item) => item.id !== id),
          }));
        } else {
          set((state) => ({
            cartItems: [
              ...state.cartItems,
              {
                id: 1,
                inStock: true,
                poster: "/shoppingCardItemTest.svg",
                price: 19990,
                oldPrice: 28990,
                title: "Дуже довга назва товару з якимись цифрами HTG-7658",
                quantity: 1,
                addServices: [],
              },
            ],
          }));
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
        get().countTotalPrice();
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
        get().countTotalPrice();
      },
      removeItemFromCart: (productId) => {
        const itemExists = get().cartItems.find(
          (item) => item.id === productId
        );

        if (itemExists) {
          const updateCartItems = get().cartItems.filter(
            (item) => item.id !== productId
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
