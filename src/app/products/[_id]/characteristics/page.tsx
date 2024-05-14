import { getProductById } from "@/api";
import Characteristics from "@/components/ProductCard/Characteristic/Characteristics";
import { IParams } from "@/types";
import { FC } from "react";

const CharacteristicsPage: FC<IParams> = async ({ params }) => {
  if (!params) {
    return <div>Loading...</div>;
  }

  const { _id } = params;

  const product = await getProductById(_id);

  return <Characteristics product={product} />;
};

export default CharacteristicsPage;
