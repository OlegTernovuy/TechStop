"use client";

import { profileNavItems } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import LogoutFilled from "../../../../public/LogoutFilled.svg";

import { signOut, useSession } from "next-auth/react";

const AccountHoverBlock = () => {
  const currentPath = usePathname();
  const { data: session } = useSession();

  return (
    <div
      className={`${
        currentPath.includes("account")
          ? "hidden"
          : "z-50 bg-transparent-200 lg:group-hover:block hidden absolute max-h-64 right-0"
      }`}
    >
      {session && session.user ? (
        <div className="bg-white text-TechStopBlue shadow-lg mt-[28px] py-4">
          <ul className="flex flex-col w-96 h-max text-TechStopBlue">
            {profileNavItems.map((item) => (
              <li
                key={item.title}
                className="flex justify-between text-body1 py-3 px-4 hover:bg-TechStopBlue10"
              >
                <Link href={item.url} className="flex gap-8 w-full">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={24}
                    height={24}
                  />
                  <p>{item.title}</p>
                </Link>
              </li>
            ))}
            <li className="flex justify-between text-body1 py-3 px-4 hover:bg-TechStopBlue10">
              <button
                className="flex gap-8 w-full"
                onClick={() => signOut({ redirect: false })}
              >
                <Image
                  src={LogoutFilled}
                  alt="LogoutFilled"
                  width={24}
                  height={24}
                />
                <p>Вийти</p>
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default AccountHoverBlock;
