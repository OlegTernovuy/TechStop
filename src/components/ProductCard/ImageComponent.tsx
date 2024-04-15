import { FC } from "react";
import Image from "next/image";
import { StaticImageData } from "next/dist/shared/lib/get-img-props";

interface IImageComponentProps {
  image: StaticImageData;
  description: string;
  width: number;
  height: number;
}

const ImageComponent: FC<IImageComponentProps> = ({
  image,
  description,
  width,
  height,
}) => {
  return <Image src={image} alt={description} width={width} height={height} />;
};

export default ImageComponent;
