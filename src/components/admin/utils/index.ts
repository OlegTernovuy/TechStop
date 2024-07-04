export const filterEmptyFields = <T extends {}>(data: T): Partial<T> =>
  Object.fromEntries(
    Object.entries(data).filter(
      ([_, value]) => value !== "" && value !== undefined
    )
  ) as Partial<T>;

export const filteredEmptyNestedFields = <T>(data: T): Partial<T> => {
  const filterObject = (obj: any): any => {
    return Object.fromEntries(
      Object.entries(obj)
        .filter(([_, value]) => {
          if (value && typeof value === "object") {
            if (Array.isArray(value)) {
              const filteredArray = value.filter((item) => {
                if (typeof item === "object") {
                  return Object.keys(filterObject(item)).length > 0;
                }
                return item !== "" && item !== null && item !== 0;
              });
              return filteredArray.length > 0;
            } else {
              const filteredValue = filterObject(value);
              return Object.keys(filteredValue).length > 0;
            }
          }
          return (
            value !== "" && value !== undefined && value !== null && value !== 0
          );
        })
        .map(([key, value]) => [
          key,
          value && typeof value === "object"
            ? Array.isArray(value)
              ? value.filter(
                  (item) =>
                    Object.keys(filterObject(item)).length > 0 || item !== ""
                )
              : filterObject(value)
            : value,
        ])
    );
  };
  return filterObject(data) as Partial<T>;
};

export const isObjectFilled = (obj: any) => {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (typeof value === "object") {
        if (isObjectFilled(value)) {
          return true;
        }
      } else if (value !== "" && value !== null && value !== 0) {
        return true;
      }
    }
  }

  return false;
};
