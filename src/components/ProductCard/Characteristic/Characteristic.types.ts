export interface Characteristics {
  compatibility: string[];
  type: string;
  additionalFeatures: string;
  connection: string;
  powerSupply: string;
  feedbackFeatures: string;
  warranty: string;
  color: string;
  id: string;
}

export enum TypesCharacteristics {
  compatibility = "Сумісність",
  type = "Тип",
  additionalFeatures = "Додаткові функції",
  connection = "Підключення",
  powerSupply = "Живлення",
  feedbackFeatures = "Функції зворотнього зв'язку",
  warranty = "Гарантія",
  color = "Колір",
}
