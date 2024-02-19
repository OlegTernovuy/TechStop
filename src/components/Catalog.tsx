import Image from "next/image";
import Link from "next/link";
import { CatalogItem } from "../constants";

const Catalog = ({ children }: { children?: React.ReactNode }) => {
  return (
    <ul className="flex flex-col py-4 text-TechStopBlue">
      {CatalogItem ? (
        CatalogItem.map((item: { icon: string; title: string }) => {
          return (
            <li key={item.title}>
              <Link href="/">
                <div className="flex justify-between text-body1 py-3 px-4 hover:bg-TechStopBlue10">
                  <div className="flex">
                    <Image
                      src={item.icon}
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
