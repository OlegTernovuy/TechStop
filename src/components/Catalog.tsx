import Image from "next/image";
import Link from "next/link";
import laptop from "../../public/catalogIcons/laptop.svg";
import { getCategories } from "@/api";

const Catalog = async ({ children }: { children?: React.ReactNode }) => {
  const categories = await getCategories();

  return (
    <ul className="flex flex-col py-4 text-TechStopBlue">
      {categories ? (
        categories.map((item) => {
          return (
            <li key={item.title}>
              <Link href={`/categories/${item.slug}`}>
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
