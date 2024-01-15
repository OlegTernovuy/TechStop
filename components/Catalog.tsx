import Image from "next/image";
import Link from "next/link";
import ArrowForwardFilled from "@mui/icons-material/ArrowForward";
import { CatalogItem } from "../constants";

const Catalog = () => {
  return (
    <ul className="flex flex-col pt-4">
      {CatalogItem ? (
        CatalogItem.map((item) => {
          return (
            <li key={item.title}>
              <Link href="/">
                <div
                  className="flex justify-between text-base py-3 px-4 hover:bg-deWiseMainHover"
                  key={item.title}
                >
                  <div className="flex">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={24}
                      height={24}
                    />
                    <p className="pl-8">{item.title}</p>
                  </div>
                  <ArrowForwardFilled />
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
