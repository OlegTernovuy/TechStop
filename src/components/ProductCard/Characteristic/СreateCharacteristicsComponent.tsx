import { FC } from "react";
import { TypesCharacteristics } from "./Characteristic.types";
import CharacteristicsComponent from "./CharacteristicsComponent";

const createCharacteristicsComponent = (
  type: TypesCharacteristics,
  description: string[]
) => {
  return (
    <CharacteristicsComponent key={type} title={type} values={description} />
  );
};

// Інтерфейс для опису продукту
interface IProductDescription {
  type: TypesCharacteristics;
  description: string[];
}

// Інтерфейс для компоненту ProductDetails
interface IProductProps {
  descriptions: IProductDescription[];
}

// Компонент ProductDetails
const CreateCharacteristicsComponent: FC<IProductProps> = ({
  descriptions,
}) => {
  return (
    <div>
      {descriptions.map(({ type, description }) =>
        createCharacteristicsComponent(type, description)
      )}
    </div>
  );
};

export default CreateCharacteristicsComponent;
