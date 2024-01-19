"use client";

import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardFilled from "@mui/icons-material/ArrowForward";

import Catalog from "./Catalog";
import { useCatalogModalStore } from "@/store/modalStore";

const CatalogModal = () => {
  const showCatalog = useCatalogModalStore((state: any) => state.showCatalog);
  const setShowCatalog = useCatalogModalStore(
    (state: any) => state.setShowCatalog
  );
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
          <h3 className="text-Headline5 text-deWiseBlack">Каталог товарів</h3>
          <button onClick={setShowCatalog}>
            <CloseIcon fontSize="medium" />
          </button>
        </div>
        <div className="text-deWiseBlack">
          <Catalog>
            <ArrowForwardFilled/>
          </Catalog>
        </div>
      </div>
      <div
        className={
            showCatalog
            ? "fixed top-0 left-0 bg-black bg-opacity-50 h-screen w-full"
            : "hidden"
        }
        onClick={setShowCatalog}
      ></div>
    </>
  );
};

export default CatalogModal;
