"use client";

import { Categories } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import laptop from "../../../public/catalogIcons/laptop.svg";
import CloseIcon from "../../../public/CloseIcon.svg";
import ChevronLeftFilled from "../../../public/ChevronLeftFilled.svg";
import ChevronRightFilled from "../../../public/ChevronRightFilled.svg";
import { useCatalogModalMobileStore } from "@/store/modalStore";

interface ICategoryProps {
  categories: Categories[] | undefined;
}

const CatalogModalMobile = ({ categories }: ICategoryProps) => {
  const showCatalog = useCatalogModalMobileStore((state) => state.showCatalog);
  const setShowCatalog = useCatalogModalMobileStore(
    (state) => state.setShowCatalog
  );

  const [title, setTitle] = useState("Каталог товарів");
  const [subcategory, setSubcategory] = useState<Categories[]>([]);

  const selectSubcategory = (title: string, subcategory: Categories[]) => {
    setTitle(title);
    setSubcategory(subcategory);
  };

  const backToCategory = () => {
    setTitle("Каталог товарів");
    setSubcategory([]);
  };

  return (
    <div
      className={
        showCatalog
          ? "fixed inset-0 bg-white overflow-y-auto h-full w-full z-10 flex flex-col text-black divide-y divide-slate-300"
          : "hidden"
      }
    >
      <div className="flex justify-between p-4">
        <button onClick={backToCategory} className="flex items-center">
          {title !== "Каталог товарів" && (
            <Image
              src={ChevronLeftFilled}
              alt="ChevronLeftFilled"
              width={24}
              height={24}
              className="mr-2"
            />
          )}
          <h3 className="text-Headline5 text-TechStopBlue">{title}</h3>
        </button>
        <button onClick={setShowCatalog}>
          <Image src={CloseIcon} alt="close" width={24} height={24} />
        </button>
      </div>
      <ul className="flex flex-col py-4 text-TechStopBlue">
        {categories ? (
          subcategory.length === 0 ? (
            categories.map((item) => {
              return (
                <li key={item.title}>
                  <button
                    onClick={() => selectSubcategory(item.title, item.children)}
                    className="w-full"
                  >
                    <div className="flex justify-between text-body1 py-3 px-4 hover:bg-TechStopBronze20">
                      <div className="flex">
                        <Image
                          src={item.icon === null ? laptop : item.icon}
                          alt={item.title}
                          width={24}
                          height={24}
                        />
                        <p className="pl-8">{item.title}</p>
                      </div>
                      <Image
                        src={ChevronRightFilled}
                        alt="ChevronRightFilled"
                        width={24}
                        height={24}
                      />
                    </div>
                  </button>
                </li>
              );
            })
          ) : (
            <div>
              {subcategory.map((item) => {
                return (
                  <li key={item.title}>
                    <Link href={`/categories/${item.slug}`}>
                      <div className="flex justify-between text-body1 py-3 px-4 hover:bg-TechStopBronze20">
                        <p>{item.title}</p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </div>
          )
        ) : (
          <div>Not found</div>
        )}
      </ul>
    </div>
  );
};

export default CatalogModalMobile;
