"use client";

import React, { FC } from "react";
import Link from "next/link";
import { join } from "path";
import { usePathname } from "next/navigation";
import { useFeedbackStore } from "@/store/useFeedbackStore";

interface IList {
  _id: string;
  title: string;
  path: string;
}

interface INavListProps {
  productNavList: IList[];
  paramsId: string;
}

const NavList: FC<INavListProps> = ({ productNavList, paramsId }) => {
  const { reviews } = useFeedbackStore();

  const currentPath = usePathname();

  return productNavList.map(({ _id, title, path }) => {
    const joinedPath = join("/products", paramsId.toString(), path);
    const isActive = currentPath === joinedPath;
    const isFeedback = _id === "3";

    return (
      <li key={_id}>
        <Link
          href={path}
          className={`uppercase text-TechStopBlue60 text-base truncate relative pb-3 transition bg-transparent ease-out duration-700 hover:text-TechStopBronze focus:text-TechStopBronze ${
            isActive ? "text-TechStopBronze " : ""
          }`}
        >
          {title}
          {isFeedback ? (
            <span
              className={`ml-1 uppercase ${
                isActive ? "text-TechStopBronze" : ""
              } font-medium text-base`}
            >
              ({reviews.length})
            </span>
          ) : (
            ""
          )}
          <span
            className={`absolute left-0 bottom-0 w-full h-1 border-2 transition bg-transparent ease-out duration-700 ${
              isActive ? "border-TechStopBronze" : "border-none"
            } `}
          ></span>
        </Link>
      </li>
    );
  });
};

export default NavList;
