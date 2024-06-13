import SingleProduct from "@/components/SingleProduct";
import { Product } from "@/types";
import Link from "next/link";

interface IIdParams {
  products: Product[] | undefined;
}

const ProductsByCategory = ({ products }: IIdParams) => {
  
  return (
    <div className="w-full">
      {products === undefined || products?.length === 0 ? null : (
        <div className="md:pt-6 md:pl-2 lg:pt-5 lg:pl-1">
          <div className="justify-center">
              <ul className="flex flex-wrap flex-row w-full ">
                {products != undefined ? (
                  products?.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className="w-1/2 md:w-1/4 xl:w-1/5 px-2 py-2 xl:px-3 xl:py-3"
                      >
                        <Link href={`/products/${item._id}/about-product`}>
                          <SingleProduct product={item} />
                        </Link>
                      </li>
                    );
                  })
                ) : (
                  <div>Not found</div>
                )}
              </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsByCategory;
