import { create } from "zustand";

interface ICheckBoxState {
  checkedItems: boolean[];
  setCheckedItems: (index: number) => void;
}

export const useCheckBoxStore = create<ICheckBoxState>((set) => ({
  checkedItems: [],
  setCheckedItems: (index: number) => {
    set((state) => {
      const newCheckedItems = [...state.checkedItems];
      newCheckedItems[index] = !newCheckedItems[index];
      return { ...state, checkedItems: newCheckedItems };
    });
  },
}));
