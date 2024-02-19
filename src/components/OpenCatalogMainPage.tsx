"use client";

import { useCatalogModalStore } from "@/store/modalStore";
import ButtonCatalog from "./ui/ButtonCatalog";

const OpenCatalogMainPage = () => {
  const setShowCatalog = useCatalogModalStore((state) => state.setShowCatalog);

  return (
    <ButtonCatalog
      stylesButton="w-full md:hidden bg-TechStopBlue text-TechStopWhite"
      icon={true}
      title="каталог товарів"
      onClick={setShowCatalog}
    />
  );
};

export default OpenCatalogMainPage;
