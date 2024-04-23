import { FC } from "react";
import { Toaster } from "react-hot-toast";

const CustomToast: FC = () => {
  return <Toaster containerStyle={{ top: 20 }} />;
};

export default CustomToast;
