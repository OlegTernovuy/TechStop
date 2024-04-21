import { FC } from "react";

interface ICatalogItemsProps {
  params: {
    id: string;
  };
}

const CatalogItem: FC<ICatalogItemsProps> = ({ params }) => {
  const { id } = params;

  return <div>page {id}</div>;
};

export default CatalogItem;
