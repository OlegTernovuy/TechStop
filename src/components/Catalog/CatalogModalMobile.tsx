"use client";

import { Categories } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import laptop from "../../../public/catalogIcons/laptop.svg";
import CloseIcon from "../../../public/CloseIcon.svg";
import ChevronLeftFilled from "../../../public/ChevronLeftFilled.svg";
import ChevronRightFilled from "../../../public/ChevronRightFilled.svg";
import { useCatalogModalMobileStore } from "@/store/modalStore";
import { useRouter } from "next/navigation";

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

  const router = useRouter();

  const backToCategory = () => {
    setTitle("Каталог товарів");
    setSubcategory([]);
  };

  const closeCatalogModal = () => {
    setShowCatalog();
    setSubcategory([]);
    setTitle("Каталог товарів");
  };

  const selectSubcategory = (
    title: string,
    subcategory: Categories[],
    slug: string
  ) => {
    if (subcategory.length === 0) {
      router.push(`/categories/${slug}`);
      // setTimeout(() => {
        setShowCatalog();
      // }, 200);
    }
    setTitle(title);
    setSubcategory(subcategory);
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
        <button onClick={closeCatalogModal}>
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
                    onClick={() =>
                      selectSubcategory(item.title, item.children, item.slug)
                    }
                    className="w-full"
                  >
                    <div className="flex justify-between text-body1 py-3 px-4 hover:bg-TechStopBronze20">
                      <div className="flex">
                        <p>{item.title}</p>
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
            <>
              {subcategory.map((item) => {
                return (
                  <div key={item.title}>
                    <li key={item.title}>
                      <Link
                        href={`/categories/${item.slug}`}
                        onClick={closeCatalogModal}
                      >
                        <div className="flex justify-between text-body1 py-3 px-4 hover:bg-TechStopBronze20">
                          <p>{item.title}</p>
                        </div>
                      </Link>
                    </li>
                    {item.children && (
                        <div className="text-body1 text-TechStopBlue60">
                          {item?.children.map((subModel) => (
                            <div className="px-4 py-[6px]" key={subModel._id}>
                              <Link
                                key={subModel._id}
                                href={`/categories/${subModel.slug}`}
                                onClick={closeCatalogModal}
                              >
                                <h3>{subModel.title}</h3>
                              </Link>
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                );
              })}
            </>
          )
        ) : (
          <div>Not found</div>
        )}
      </ul>
    </div>
  );
};

export default CatalogModalMobile;
