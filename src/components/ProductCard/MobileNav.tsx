import React from "react";
import Link from "next/link";
import Image from "next/image";

import iconLeft from "/public/icon_left.svg";

const MobileNav = () => {
  return (
    <div className="py-6 border-b-[1px] w-full border-b-TechStopBlue40 md:hidden">
      {" "}
      <Link href="/" className="flex items-center ml-6">
        <Image
          src={iconLeft}
          alt="icon_left"
          width={24}
          height={24}
          priority={true}
        />
        <span className="text-TechStopBlue text-lg uppercase font-medium tracking-[0.46px] ml-1 ">
          Геймпад Microsoft
        </span>
      </Link>
    </div>
  );
};

export default MobileNav;
