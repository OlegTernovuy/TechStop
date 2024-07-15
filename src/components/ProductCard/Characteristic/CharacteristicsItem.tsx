import { FC } from "react";

interface CharacteristicsItemProps {
  title: string;
  values: string[];
}

const CharacteristicsItem: FC<CharacteristicsItemProps> = ({
  title,
  values,
}) => {
  return (
    <div className="flex mb-4 flex-row ">
      {/* w-2/5 */}
      <dt className="self-start min-w-2/5 text-TechStopBlue relative before:hidden md:before:block before:border-b-2 before:absolute before:left-0 before:bottom-1 before:w-full">
        <span className="text-TechStopBlue relative inline-block bg-TechStopWhite">
          {title}
        </span>
      </dt>{" "}
      <dd className="text-TechStopBlue break-words">
        <ul>
          {values.map((item, idx) => (
            <li key={idx} className="flex">
              {item}
            </li>
          ))}
        </ul>
      </dd>
    </div>
  );
};

export default CharacteristicsItem;
