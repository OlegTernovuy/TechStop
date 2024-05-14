import { FC } from "react";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import Image from "next/image";

import heart from "/public/product-card-icons/heart.svg";
import heartActive from "/public/product-card-icons/heart_active.svg";

interface IToggleButtonProps {
  _id: string;
  text?: string;
}

const ToggleButton: FC<IToggleButtonProps> = ({ _id, text }) => {
  const { isFavoriteProduct } = useFavoritesStore();

  return (
    <div className="flex gap-[10px]">
      {!isFavoriteProduct(_id) ? (
        <Image src={heartActive} alt="basket" width={20} height={20} />
      ) : (
        <Image src={heart} alt="basket" width={20} height={20} />
      )}
      {text && <span> {text}</span>}
    </div>
  );
};

export default ToggleButton;
