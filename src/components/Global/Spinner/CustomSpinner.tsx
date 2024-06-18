import { FC } from "react";
import { ThreeDots } from "react-loader-spinner";

interface ICustomSpinnerProps {
  height?: number;
  width?: number;
}

const CustomSpinner: FC<ICustomSpinnerProps> = ({ width, height }) => {
  return (
    <ThreeDots
      visible={true}
      height={height || 80}
      width={width || 80}
      color="#CC7E00"
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass="flex justify-center items-center"
    />
  );
};

export default CustomSpinner;
