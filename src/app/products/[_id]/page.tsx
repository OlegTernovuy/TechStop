import { FC, Suspense } from "react";
import AboutPage from "./about-product/page";

const Page: FC = () => {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <AboutPage />
    </Suspense>
  );
};

export default Page;
