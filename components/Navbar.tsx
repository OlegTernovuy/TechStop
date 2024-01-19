"use client";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import SearchField from "./SearchField";
import MobileMenu from "./MobileMenu";
import ButtonCatalog from "./ButtonCatalog";
import { useShoppingCardModalStore } from "@/store/modalStore";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const setShowShoppingCard = useShoppingCardModalStore(
    (state: any) => state.setShowShoppingCard
  );

  return (
    <header className="bg-deWiseBlack h-16 md:h-28 flex justify-start items-center max-w-full  ">
      <div className="flex justify-between gap-6 items-center w-screen px-4 lg:px-8 xl:px-[104px]">
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
          <ButtonCatalog stylesButton="hidden lg:flex" />
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
        <button onClick={setShowShoppingCard}>
          <ShoppingCartOutlinedIcon fontSize="large" className="text-white" />
        </button>
      </div>
      <MobileMenu nav={nav} handleNav={handleNav} />
    </header>
  );
};

export default Navbar;
