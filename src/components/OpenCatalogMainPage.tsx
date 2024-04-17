"use client";

import { useCatalogModalStore } from "@/store/modalStore";
import Button from "./ui/Button";

const OpenCatalogMainPage = () => {
  const setShowCatalog = useCatalogModalStore((state) => state.setShowCatalog);

  return (
    <Button
      stylesButton="w-full md:hidden bg-TechStopWhite text-TechStopBlue border-[1px] border-TechStopBlue40"
      icon={true}
      title="каталог товарів"
      onClick={setShowCatalog}
    />
  );
};

export default OpenCatalogMainPage;
