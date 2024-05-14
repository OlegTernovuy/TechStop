import { FC } from "react";

interface ICharacteristicsSimpleItemProps {
  title: string;
  type: string;
}

const CharacteristicsSimpleItem: FC<ICharacteristicsSimpleItemProps> = ({
  title,
  type,
}) => {
  return (
    <div className="flex mb-4 ">
      {" "}
      <dt className="self-start w-2/5 text-TechStopBlue relative before:hidden md:before:block before:border-b-2 before:absolute before:left-0 before:bottom-1 before:w-full">
        <span className="text-TechStopBlue relative inline-block bg-TechStopWhite">
          {title}
        </span>
      </dt>{" "}
      <dd className="text-TechStopBlue break-words">
        <span>{type}</span>
      </dd>
    </div>
  );
};

export default CharacteristicsSimpleItem;
