import { format } from "date-fns";
import { uk } from "date-fns/locale";

export const formatDate = (date: string) => {
  const incomeDate = new Date(date);

  return format(incomeDate, "d MMMM yyyy року", { locale: uk });
};
