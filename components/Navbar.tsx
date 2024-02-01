"use client";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import SearchField from "./SearchField";
import MobileMenu from "./MobileMenu";
import ButtonCatalog from "./ButtonCatalog";
import BasketHoverBlock from "./BasketHoverBlock";
import { useCatalogModalStore } from "@/store/modalStore";
import MaxWidthWrapper from "./MaxWidthWrapper";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const setShowCatalog = useCatalogModalStore((state) => state.setShowCatalog);

  return (
    <header className="bg-deWiseBlack relative h-16 md:h-28 flex items-center max-w-full">
      <MaxWidthWrapper className="flex justify-between md:gap-6 items-center">
        <div className="flex items-center gap-0 md:gap-16">
          <button onClick={handleNav}>
            <MenuIcon
              sx={{
                width: 48,
                height: 48,
                color: "#ffffff",
              }}
            />
          </button>
          <Link href="/">
            <Image
              src="/logo-footer.svg"
              alt="logo"
              width={193}
              height={72}
              className="hidden md:block"
            />
          </Link>
          <ButtonCatalog
            icon={true}
            stylesButton="hidden lg:flex w-60 bg-deWiseMain text-deWiseBlack"
            title="каталог товарів"
            onClick={setShowCatalog}
          />
        </div>

        <Link href="/">
          <Image
            src="/navLogo.svg"
            alt="logo"
            width={30}
            height={32}
            priority={true}
            className="max-w-[30px] md:hidden"
          />
        </Link>
        <SearchField />
        <div className="group relative">
          <Link href="/shoppingCart">
            <ShoppingCartOutlinedIcon fontSize="large" className="text-white" />
          </Link>
          <BasketHoverBlock />
        </div>
      </MaxWidthWrapper>
      <MobileMenu nav={nav} handleNav={handleNav} />
    </header>
  );
};

export default Navbar;
