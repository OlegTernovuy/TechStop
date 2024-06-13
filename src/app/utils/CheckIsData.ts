
import { IAdd } from "@/types";

export const checkIsContact = <T extends Record<string, string | number | boolean | undefined>>(
    formValues: T,
    setAdd: React.Dispatch<React.SetStateAction<IAdd>>
  ) => {
    setAdd((prevAdd) => {
      const updatedAdd = { ...prevAdd };
      for (let key in formValues) {
        if (Object.prototype.hasOwnProperty.call(formValues, key)) {
          updatedAdd[key] = String(formValues[key]);
        }
      }
      return updatedAdd;
    });
  };