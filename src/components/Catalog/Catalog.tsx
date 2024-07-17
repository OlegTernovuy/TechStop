'use client'
import { getCategories } from "@/api";
import { Categories } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

const Catalog = ({ children }: { children?: React.ReactNode }) => {
  const [categories, setCategories] = useState<Categories[] | undefined>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };

    fetchCategories();
  }, []);
  return (
    <ul className="flex flex-col py-6 text-TechStopBlue">
      {categories ? (
        categories.map((item) => {
          return (
            <li key={item.title}>
              <Link href={`/categories/${item.slug}`}>
                <div className="flex justify-between text-body1 py-3 px-4 hover:bg-TechStopBronze20">
                    <p>{item.title}</p>
                  {children}
                </div>
              </Link>
            </li>
          );
        })
      ) : (
        <div>Not found</div>
      )}
    </ul>
  );
};

export default Catalog;
