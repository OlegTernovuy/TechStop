"use client";

import ArrowForwardFilled from "@mui/icons-material/ArrowForward";

import Catalog from "./Catalog";
import { useCatalogModalStore } from "@/store/modalStore";
import Image from "next/image";

const CatalogModal = () => {
  const showCatalog = useCatalogModalStore((state) => state.showCatalog);
  const setShowCatalog = useCatalogModalStore((state) => state.setShowCatalog);

  typeof window !== "undefined"
    ? showCatalog
      ? document.body.classList.add("overflow-hidden")
      : document.body.classList.remove("overflow-hidden")
    : null;

  return (
    <>
      <div
        className={
          showCatalog
            ? "fixed inset-0 bg-white overflow-y-auto h-full w-full z-10 md:max-w-[960px] md:h-min md:max-h-[760px] m-auto md:rounded-lg flex flex-col text-black divide-y divide-slate-300"
            : "hidden"
        }
      >
        <div className="flex justify-between p-4">
          <h3 className="text-Headline5 text-TechStopBlue">Каталог товарів</h3>
          <button onClick={setShowCatalog}>
            <Image src="CloseIcon.svg" alt="close" width={24} height={24} />
          </button>
        </div>
        <div className="text-deWiseBlack">
          <Catalog>
            <ArrowForwardFilled />
          </Catalog>
        </div>
      </div>
      <div
        className={
          showCatalog
            ? "fixed top-0 left-0 bg-black bg-opacity-30 h-screen w-full"
            : "hidden"
        }
        onClick={setShowCatalog}
      ></div>
    </>
  );
};

export default CatalogModal;
