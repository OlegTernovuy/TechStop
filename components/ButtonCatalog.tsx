"use client";

import Image from "next/image";
import { ButtonCatalogProps } from "../types";

const ButtonCatalog = (props: ButtonCatalogProps) => {
  const { stylesButton, title, onClick, icon } = props;

  return (
    <div>
      <button
        className={` bg-deWiseMain h-[52px] flex justify-center items-center py-2 px-6 rounded border-none ${stylesButton}`}
        onClick={onClick}
      >
        {icon && (
          <Image
            src="/buttonIcon.svg"
            alt="buttonIcon"
            width={24}
            height={24}
            style={{ marginRight: "8px" }}
          />
        )}
        <span className="text-sm uppercase">{title}</span>
      </button>
    </div>
  );
};

export default ButtonCatalog;
