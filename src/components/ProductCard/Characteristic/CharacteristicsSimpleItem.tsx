import { FC } from "react";

interface ICharacteristicsSimpleItemProps {
  title: string;
  type: string[];
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
      <dd className="text-TechStopBlue break-words md:overflow-nowrap">
        {type.map((item, idx) => (
          <span key={idx}>{item}</span>
        ))}
      </dd>
    </div>
  );
};

export default CharacteristicsSimpleItem;
