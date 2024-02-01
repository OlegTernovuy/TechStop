"use client";

import { useCatalogModalStore } from "@/store/modalStore";
import ButtonCatalog from "./ButtonCatalog";

const OpenCatalogMainPage = () => {
  const setShowCatalog = useCatalogModalStore((state) => state.setShowCatalog);

  return (
    <ButtonCatalog
      stylesButton="w-full md:hidden bg-deWiseMain text-deWiseBlack"
      icon={true}
      title="каталог товарів"
      onClick={setShowCatalog}
    />
  );
};

export default OpenCatalogMainPage;
