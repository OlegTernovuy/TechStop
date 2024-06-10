import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IPriceFilter {
  priceFrom?: number;
  priceTo?: number;
}

export interface IBrandFilter {
  brandId: number;
  brandTitle: string;
}

interface FilterState {
  categoryFilter: string;
  brandFilters: IBrandFilter[];
  priceFilter: IPriceFilter;
  sortFilter: string;
  addProductBrandFilter: (service: IBrandFilter) => void;
  checkBrandFilter: (servicesId: number) => boolean;
  setCategoryFilter: (category: string) => void;
  setPriceFilter: (priceFrom?: number, priceTo?: number) => void;
  setSortFilter: (sort: string) => void;
  clearAllFilter: () => void;
}

export const useFilterStore = create(
  persist<FilterState>(
    (set, get) => ({
      categoryFilter: "",
      sortFilter: "популярні",
      brandFilters: [],
      priceFilter: {
        priceFrom: undefined,
        priceTo: undefined,
      },
      addProductBrandFilter: (service) => {
        const { brandFilters } = get();

        const updatedCartItems = [...brandFilters];

        const serviceIndex = updatedCartItems.findIndex(
          (itemService) => itemService.brandId === service.brandId
        );

        if (serviceIndex !== -1) {
          updatedCartItems.splice(serviceIndex, 1);
        } else {
          updatedCartItems.push(service);
        }

        set({ brandFilters: updatedCartItems });
      },
      checkBrandFilter: (servicesId) => {
        const { brandFilters } = get();

        return brandFilters.some((service) => service.brandId === servicesId);
      },
      setCategoryFilter: (category) => {
        set({ categoryFilter: category });
      },
      setPriceFilter: (priceFrom, priceTo) => {
        priceFrom && priceTo !== undefined;
        set({
          priceFilter: {
            priceFrom: priceFrom,
            priceTo: priceTo,
          },
        });
      },
      setSortFilter: (sort) => {
        set({
          sortFilter: sort
        });
      },
      clearAllFilter: () => {
        set({
          categoryFilter: "",
          brandFilters: [],
          priceFilter: {
            priceFrom: undefined,
            priceTo: undefined,
          },
          sortFilter: 'популярні'
        });
      },
    }),
    {
      name: "Product-Filters",
    }
  )
);
