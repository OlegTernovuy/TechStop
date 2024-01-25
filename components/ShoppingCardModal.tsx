"use client";

import { useShoppingCardModalStore } from "@/store/modalStore";
import ShoppingCard from "./ShoppingCardEmpty";
import CloseIcon from "@mui/icons-material/Close";

const ShoppingCardModal = () => {
  const showShoppingCard = useShoppingCardModalStore(
    (state) => state.showShoppingCard
  );
  const setShowShoppingCard = useShoppingCardModalStore(
    (state) => state.setShowShoppingCard
  );
  return (
    <div
      className={
        showShoppingCard
          ? "fixed inset-0 bg-white overflow-y-auto h-full w-full md:max-w-[960px] md:h-min md:max-h-[760px] m-auto md:rounded-lg flex flex-col text-black divide-y divide-slate-300"
          : "hidden"
      }
    >
      <div className="flex justify-between p-4">
        <h3 className="text-Headline5 text-deWiseBlack">Кошик</h3>
        <button onClick={setShowShoppingCard}>
          <CloseIcon fontSize="medium" />
        </button>
      </div>
      <ShoppingCard />
    </div>
  );
};

export default ShoppingCardModal;
