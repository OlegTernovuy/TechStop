import Image from "next/image";
import { ButtonCatalogProps } from "../types";

const ButtonCatalog = (props: ButtonCatalogProps) => {
  const { stylesButton } = props;
  return (
    <>
      <button
        className={`w-60 bg-deWiseMain flex justify-center items-center py-2 px-6 rounded border-none ${stylesButton}`}
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
