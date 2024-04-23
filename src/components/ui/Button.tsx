"use client";

import Image from "next/image";
import { ButtonProps } from "../../types";

const Button = (props: ButtonProps) => {
  const { stylesButton, title, onClick, icon, disabled } = props;

  return (
    <button
      className={`h-[52px] min-w-[200px] flex justify-center items-center py-2 rounded ${stylesButton}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && (
        <Image
          src="/ButtonCatalogIcon.svg"
          alt="buttonIcon"
          width={24}
          height={24}
          style={{ marginRight: "8px" }}
        />
      )}
      <span className="text-[15px] tracking-wide font-medium uppercase">
        {title}
      </span>
    </button>
  );
};

export default Button;
