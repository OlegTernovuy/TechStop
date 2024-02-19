import Link from "next/link";
import { CatalogItem } from "../constants";
import Image from "next/image";

const CategoryDesktopBlock = () => {
  return (
    <div className="mt-4 w-full">
      <ul className="flex items-center divide-x-2">
        {CatalogItem.length > 0 ? (
          CatalogItem.slice(0, 5).map(
            (item: { icon: string; title: string }) => {
              return (
                <li key={item.title}>
                  <Link href="/">
                    <div className="flex justify-between text-base py-3 px-4 mx-2 hover:bg-deWiseMainHover">
                      <Image
                        src={item.icon}
                        alt={item.title}
                        width={24}
                        height={24}
                      />
                      <p className="pl-8">{item.title}</p>
                    </div>
                  </Link>
                </li>
              );
            }
          )
        ) : (
          <div>Not found</div>
        )}
      </ul>
    </div>
  );
};

export default CategoryDesktopBlock;
