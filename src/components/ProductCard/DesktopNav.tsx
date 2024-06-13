import React, { FC } from "react";
import Link from "next/link";

interface Props {
  name: string;
  path: string;
}

interface DesktopNavProps {
  urlNavList: Props[];
}

const DesktopNav: FC<DesktopNavProps> = ({ urlNavList }) => {
  return (
    <div className="hidden md:block my-8">
      {urlNavList.map(({ name, path }, idx) => (
        <span key={idx} className="text-TechStopBlue60">
          <Link
            className="hover:text-TechStopBronze transition ease-out duration-300"
            href={path}
          >
            {name}
          </Link>
          {idx < urlNavList.length - 1 && " / "}
        </span>
      ))}
    </div>
  );
};

export default DesktopNav;
