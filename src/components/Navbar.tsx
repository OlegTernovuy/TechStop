"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import SearchField from "./ui/SearchField";
import MobileMenu from "./ui/MobileMenu";
import CloseIcon from "../../public/CloseIcon.svg";
import ButtonCatalogIcon from "../../public/ButtonCatalogIcon.svg";
import BasketHoverBlock from "./(ShoppingCart)/BasketHoverBlock";
import {
  useCatalogModalStore,
  useLoginModalStore,
  useShoppingCartModalStore,
} from "@/store/modalStore";
import MaxWidthWrapper from "./MaxWidthWrapper";
import AccountHoverBlock from "@/app/account/(ui)/AccountHoverBlock";
import { usePathname, useRouter } from "next/navigation";

import menuIcon from "/public/MenuIcon.svg";
import techLogo from "/public/TechLogo.svg";
import accountCircleOutline from "/public/AccountCircleOutlined.svg";
import favorite from "/public/favorite.svg";
import shoppingCartIcon from "/public/ShoppingCartIcon.svg";

import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const setShowLoginModal = useLoginModalStore(
    (state) => state.setShowLoginModal
  );

  const setShowCatalog = useCatalogModalStore((state) => state.setShowCatalog);
  const showCatalog = useCatalogModalStore((state) => state.showCatalog);
  const setShowShoppingCart = useShoppingCartModalStore(
    (state) => state.setShowShoppingCart
  );

  const router = useRouter();
  const pathname = usePathname();

  const refresh = () => {
    pathname === "/" ? window.location.reload() : router.push("/");
  };

  const { data: session } = useSession();
  // console.log({session});

  const logout = async () => {
    const res = await fetch(
      "https://team-project-server-41ev.onrender.com/api/auth/logout",
      {
        method: "POST",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImVtYWlsIjoidGVybkBnbWFpbC5jb20iLCJ1c2VySWQiOiI2NjQzMWVmZTg0YTg1OGU1NTE2YjljMTAifSwiaWF0IjoxNzE1NjkyNjU4LCJleHAiOjE3MTU2OTM1NTh9.PArSOAm5IMi_d8Svm7BWBMpEw-M3j9HZqn-iDkDkLMU",
          "Content-Type": "application/json",
        },
      }
    );

    if (res.status == 401) {
      console.log(res.statusText);

      return null;
    }
    const user = await res.json();
    return user;
  };

  return (
    <header className="bg-TechStopWhite relative flex items-center max-w-full border-b-[1px] border-b-TechStopBlue40 py-2 md:py-0">
      <MaxWidthWrapper className="flex justify-between items-center">
        <button onClick={handleNav} className="flex md:hidden">
          <Image src={menuIcon} alt="Menu Icon" width={48} height={48} />
        </button>
        <button onClick={refresh}>
          <Image
            src={techLogo}
            alt="logo"
            width={116}
            height={89}
            className="w-16 md:w-28"
          />
        </button>
        <button
          className={`h-[52px] min-w-[200px] hidden lg:flex justify-center items-center py-2 rounded w-80 bg-TechStopWhite text-TechStopBlue border-[1px] border-TechStopBlue40`}
          onClick={setShowCatalog}
        >
          <Image
            src={showCatalog ? CloseIcon : ButtonCatalogIcon}
            alt="buttonIcon"
            width={24}
            height={24}
            style={{ marginRight: "8px" }}
          />
          <span className="text-[15px] tracking-wide font-medium uppercase">
            каталог товарів
          </span>
        </button>
        <SearchField />
        <div className="flex gap-10">
          {session && session.user ? (
            <div className="flex gap-4 ml-auto">
              {/* <p className="text-sky-600">{session?.user?.email}</p> */}
              {/* <Link
                href={"/api/auth/signout"}
                className="flex gap-4 ml-auto text-red-600"
              >
                Sign Out
              </Link> */}
              <button onClick={() => signOut({ redirect: false })}>
                Sign Out
              </button>
              {/* <button onClick={logout}>Sign Out</button> */}
            </div>
          ) : (
            <div className="flex items-center">
              {/* <Link
                href={"/api/auth/signin"}
                className="flex gap-4 ml-auto text-green-600"
              >
                Sign In
              </Link> */}
              <button onClick={setShowLoginModal}>Login</button>
            </div>
          )}
          <div className="group relative hidden md:block">
            <Link
              href={session && session.user ? "/account" : "/InformationCenter"}
            >
              <Image
                src={accountCircleOutline}
                alt="AccountCircleOutlined"
                width={32}
                height={32}
                className="hover:[filter:drop-shadow(0px_3px_1px_#02275066)] ease-out duration-200 active:bg-TechStopBlue10 active:rounded-md"
              />
            </Link>
            <AccountHoverBlock />
          </div>
          <Link href="/account/favorites" className="hidden md:flex">
            <Image
              src={favorite}
              alt="favorite"
              width={32}
              height={32}
              className="hover:[filter:drop-shadow(0px_3px_1px_#02275066)] ease-out duration-200 active:bg-TechStopBlue10 active:rounded-md"
            />
          </Link>
          <div className="group relative">
            <button onClick={setShowShoppingCart} className="flex items-center">
              <Image
                src={shoppingCartIcon}
                alt="ShoppingCartIcon"
                width={32}
                height={32}
                className="hover:[filter:drop-shadow(0px_2px_1px_#02275066)] ease-out duration-200"
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
