import { getProductsByQuery } from "@/api";
import { Product } from "@/types";
import { FC } from "react";
import ProductsByCategory from "../../ProductsByCategory";
import NoSsr from "@/app/utils/NoSsr";

interface ICatalogItemsProps {
  params: {
    id: string;
  };
}

const CatalogItem: FC<ICatalogItemsProps> = async ({ params }) => {
  const { id } = params;

  const products = await getProductsByQuery(id);

  //   const [data, setData] = useState<Product[] | undefined>();

  //   const productsData = useMemo(() => {
  //     return getProductsByQuery(id);
  //   }, [id]);

  //   useEffect(() => {
  //     const fetchProducts = async () => {
  //       const product = await productsData;

  //       setData(product);
  //     };

  //     fetchProducts();
  //   }, [productsData]);

  //   console.log(data);

  return (
    <div className="w-full">
        <ProductsByCategory products={products} />
    </div>
  );
};

export default CatalogItem;
