"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import SearchField from "./ui/SearchField";
import MobileMenu from "./ui/MobileMenu";
import Button from "./ui/Button";
import BasketHoverBlock from "./(ShoppingCart)/BasketHoverBlock";
import {
  useCatalogModalStore,
  useShoppingCartModalStore,
} from "@/store/modalStore";
import MaxWidthWrapper from "./MaxWidthWrapper";
import AccountHoverBlock from "@/app/account/(ui)/AccountHoverBlock";
import { usePathname, useRouter } from "next/navigation";
import path from "path";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const setShowCatalog = useCatalogModalStore((state) => state.setShowCatalog);
  const setShowShoppingCart = useShoppingCartModalStore(
    (state) => state.setShowShoppingCart
  );

  const router = useRouter();
  const pathname = usePathname();

  const refresh = () => {
    pathname === "/" ? window.location.reload() : router.push("/");
  };

  return (
    <header className="bg-TechStopWhite relative flex items-center max-w-full border-b-[1px] border-b-TechStopBlue40 py-2 md:py-0">
      <MaxWidthWrapper className="flex justify-between items-center">
        <button onClick={handleNav} className="flex md:hidden">
          <Image src="./MenuIcon.svg" alt="Menu Icon" width={48} height={48} />
        </button>
        <button onClick={refresh}>
          <Image
            src="/TechLogo.svg"
            alt="logo"
            width={116}
            height={89}
            className="w-16 md:w-28"
          />
        </button>
        <Button
          icon={true}
          stylesButton="hidden lg:flex w-80 bg-TechStopWhite text-TechStopBlue border-[1px] border-TechStopBlue40"
          title="каталог товарів"
          onClick={setShowCatalog}
        />
        <SearchField />
        <div className="flex gap-10">
          <div className="group relative hidden md:block">
            <Link href="/account">
              <Image
                src="./AccountCircleOutlined.svg"
                alt="AccountCircleOutlined"
                width={32}
                height={32}
              />
            </Link>
            <AccountHoverBlock />
          </div>
          <Link href="/account/favorites" className="hidden md:flex">
            <Image
              src="./favorite.svg"
              alt="favorite"
              width={32}
              height={32}
            />
          </Link>
          <div className="group relative">
            <button onClick={setShowShoppingCart} className="flex items-center">
              <Image
                src="./ShoppingCartIcon.svg"
                alt="ShoppingCartIcon"
                width={32}
                height={32}
              />
            </button>
            <BasketHoverBlock />
          </div>
        </div>
      </MaxWidthWrapper>
      <MobileMenu nav={nav} handleNav={handleNav} />
    </header>
  );
};

export default Navbar;
