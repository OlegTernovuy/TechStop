import Link from "next/link";
import { getCategories } from "@/api";

const Catalog = async ({ children }: { children?: React.ReactNode }) => {
  const categories = await getCategories();

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
