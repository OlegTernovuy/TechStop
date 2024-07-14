import { FC } from "react";
import { TypesCharacteristics } from "./Characteristic.types";
import CharacteristicsComponent from "./CharacteristicsComponent";
import { ICharacteristic } from "@/types";

// const characteristics = [
//   {
//     compatibility: [
//       "Microsoft Xbox One",
//       "Microsoft Xbox Series S",
//       "Microsoft Xbox Series X",
//       "PC",
//       "Mac",
//       "Microsoft Xbox One",
//       "Смартфони з ОС Android",
//       "Планшети з ОС Android",
//     ],
//     type: "Геймпад",
//     additionalFeatures: [
//       " Спеціальна кнопка «Поділитися» (Зручний механізм захоплення та обміну контентом, таким як знімки екрана, записи та багато іншого)",
//       "Нова гібридна хрестовина, текстурована поверхня тригерів, бамперів та задньої частини корпусу",
//       "Роз'єм стереогарнітури 3.5 мм",
//     ],

//     connection: "Бездротове",
//     powerSupply: "Батарейки",
//     feedbackFeatures: "Вібраційна",
//     warranty: "6 місяців",
//     color: "чорний",
//     id: "uniqueId123",
//   },
// ];

interface ICharacteristicsInfoProps {
  characteristics: ICharacteristic[];
}

const getCharacteristicTitle = (name: string) => {
  const typeKey = Object.keys(TypesCharacteristics).find(
    (key) =>
      TypesCharacteristics[key as keyof typeof TypesCharacteristics] === name
  );

  return typeKey
    ? TypesCharacteristics[typeKey as keyof typeof TypesCharacteristics]
    : name;
};

const CharacteristicsInfo: FC<ICharacteristicsInfoProps> = ({
  characteristics,
}) => {
  return (
    <dl>
      {" "}
      {characteristics?.map(
        (
          {
            name,
            description,
            // id,
            // type,
            // additionalFeatures,
            // connection,
            // powerSupply,
            // feedbackFeatures,
            // warranty,
            // color,
            // compatibility,
          },
          idx
        ) => (
          <div key={idx}>
            {/* <CharacteristicsItem title={name} values={description} /> */}
            {/* <CharacteristicsSimpleItem title={name} type={description} /> */}
            <CharacteristicsComponent
              title={getCharacteristicTitle(name)}
              values={[...description]}
            />
            {/* <CharacteristicsSimpleItem
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
            /> */}
          </div>
        )
      )}
    </dl>
  );
};

export default CharacteristicsInfo;
