export const filterEmptyFields = <T extends {}>(data: T): Partial<T> => {
  return Object.fromEntries(
    Object.entries(data).filter(
      ([_, value]) => value !== "" && value !== undefined
    )
  ) as Partial<T>;
};
