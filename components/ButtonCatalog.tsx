"use client";

import Image from "next/image";
import { ButtonCatalogProps } from "../types";
import { useCatalogModalStore } from "@/store/modalStore";

const ButtonCatalog = (props: ButtonCatalogProps) => {
  const { stylesButton } = props;

  const setShowCatalog = useCatalogModalStore((state) => state.setShowCatalog);

  return (
    <>
      <button
        className={`w-60 bg-deWiseMain flex justify-center items-center py-2 px-6 rounded border-none ${stylesButton}`}
        onClick={setShowCatalog}
      >
        <Image
          src="/buttonIcon.svg"
          alt="buttonIcon"
          width={24}
          height={24}
          style={{ marginRight: "8px" }}
        />
        <span className="text-sm uppercase">каталог товарів</span>
      </button>
    </>
  );
};

export default ButtonCatalog;
