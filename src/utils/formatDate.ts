import { format } from "date-fns";

export const formatDate = (dateString: NativeDate) => {
  const date = new Date(dateString);
  return format(date, "dd.MM.yyyy HH:mm:ss");
};
