"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import SearchField from "./ui/SearchField";
import MobileMenu from "./ui/MobileMenu";
import ButtonCatalog from "./ui/ButtonCatalog";
import BasketHoverBlock from "./(ShoppingCart)/BasketHoverBlock";
import {
  useCatalogModalStore,
  useShoppingCartModalStore,
} from "@/store/modalStore";
import MaxWidthWrapper from "./MaxWidthWrapper";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const setShowCatalog = useCatalogModalStore((state) => state.setShowCatalog);
  const setShowShoppingCart = useShoppingCartModalStore(
    (state) => state.setShowShoppingCart
  );

  return (
    <header className="bg-TechStopWhite relative flex items-center max-w-full border-b-[1px] border-b-TechStopBlue40 py-2 md:py-0">
      <MaxWidthWrapper className="flex justify-between md:gap-6 items-center">
        <div className="flex items-center gap-0 md:gap-16">
          <button onClick={handleNav}>
            <Image
              src="./MenuIcon.svg"
              alt="Menu Icon"
              width={48}
              height={48}
            />
          </button>
          <Link href="/">
            <Image
              src="/TechLogo.svg"
              alt="logo"
              width={116}
              height={89}
              className="hidden md:block"
            />
          </Link>
          <ButtonCatalog
            icon={true}
            stylesButton="hidden lg:flex w-80 bg-TechStopWhite text-TechStopBlue border-[1px] border-TechStopBlue40"
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
          {/* <Link href="/shoppingCart"> */}
          <button onClick={setShowShoppingCart}>
            <Image
              src="./ShoppingCartIcon.svg"
              alt="ShoppingCartIcon"
              width={32}
              height={32}
            />
          </button>
          {/* </Link> */}
          <BasketHoverBlock />
        </div>
      </MaxWidthWrapper>
      <MobileMenu nav={nav} handleNav={handleNav} />
    </header>
  );
};

export default Navbar;
