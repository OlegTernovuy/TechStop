import { FC } from "react";
import { TypesCharacteristics } from "./Characteristic.types";
import CharacteristicsItem from "./CharacteristicsItem";
import CharacteristicsSimpleItem from "./CharacteristicsSimpleItem";
import CharacteristicsComponent from "./CharacteristicsComponent";

const characteristics = [
  {
    compatibility: [
      "Microsoft Xbox One",
      "Microsoft Xbox Series S",
      "Microsoft Xbox Series X",
      "PC",
      "Mac",
      "Microsoft Xbox One",
      "Смартфони з ОС Android",
      "Планшети з ОС Android",
    ],
    type: "Геймпад",
    additionalFeatures: [
      " Спеціальна кнопка «Поділитися» (Зручний механізм захоплення та обміну контентом, таким як знімки екрана, записи та багато іншого)",
      "Нова гібридна хрестовина, текстурована поверхня тригерів, бамперів та задньої частини корпусу",
      "Роз'єм стереогарнітури 3.5 мм",
    ],

    connection: "Бездротове",
    powerSupply: "Батарейки",
    feedbackFeatures: "Вібраційна",
    warranty: "6 місяців",
    color: "чорний",
    id: "uniqueId123",
  },
];

const CharacteristicsInfo: FC = () => {
  return (
    <dl>
      {" "}
      {characteristics.map(
        ({
          id,
          type,
          additionalFeatures,
          connection,
          powerSupply,
          feedbackFeatures,
          warranty,
          color,
          compatibility,
        }) => (
          <div key={id}>
            <CharacteristicsItem
              title={TypesCharacteristics.compatibility}
              values={compatibility}
            />
            <CharacteristicsSimpleItem
              title={TypesCharacteristics.type}
              type={type}
            />
            <CharacteristicsComponent
              title={TypesCharacteristics.additionalFeatures}
              values={additionalFeatures}
            />
            <CharacteristicsSimpleItem
              title={TypesCharacteristics.connection}
              type={connection}
            />
            <CharacteristicsSimpleItem
              title={TypesCharacteristics.powerSupply}
              type={powerSupply}
            />
            <CharacteristicsSimpleItem
              title={TypesCharacteristics.feedbackFeatures}
              type={feedbackFeatures}
            />
            <CharacteristicsSimpleItem
              title={TypesCharacteristics.warranty}
              type={warranty}
            />
            <CharacteristicsSimpleItem
              title={TypesCharacteristics.color}
              type={color}
            />
          </div>
        )
      )}
    </dl>
  );
};

export default CharacteristicsInfo;
