"use client";

import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import { useShoppingCardModalStore } from "@/store/modalStore";

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
      <div className="text-deWiseBlack">
        {" "}
        <div className="flex flex-col pt-16 px-4 items-center text-center">
          <Image
            src="/shoppingCardEmpty.svg"
            alt="ShoppingCartEmpty"
            width={100}
            height={100}
          />
          <span>
            <h2 className="text-Headline5 pt-8 pb-1">Кошик порожній</h2>
            <p className="text-base">Вперед до покупок :)</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCardModal;
