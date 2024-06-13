import { ReactNode } from "react";

const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={`mx-auto w-full max-w-[1712px] px-2 md:px-4 lg:px-6 xl:px-8
        ${className}`}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
