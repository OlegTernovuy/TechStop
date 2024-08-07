import React, { FC } from "react";

interface CharacteristicsItemProps {
  title: string;
  values: string[];
}

const CharacteristicsComponent: FC<CharacteristicsItemProps> = ({
  title,
  values,
}) => {
  return (
    <div className="flex flex-row mb-4 ">
      <dt className="self-start w-2/5 text-TechStopBlue relative before:hidden md:before:block before:border-b-2 before:absolute before:left-0 before:bottom-1 before:w-full">
        <span className="text-TechStopBlue relative inline-block bg-TechStopWhite">
          {title}
        </span>
      </dt>{" "}
      <dd className="text-TechStopBlue flex w-3/5 break-words">
        <ul>
          {values.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </dd>
    </div>
  );
};

export default CharacteristicsComponent;
