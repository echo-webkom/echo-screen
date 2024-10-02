import {
  differenceInHours,
  format,
  isAfter,
  isBefore,
  isFuture,
  isPast,
  nextMonday,
  startOfDay,
} from "date-fns";
import { nb } from "date-fns/locale/nb";

export type Dateish = Date | string | number;

/**
 * From a date, return a string formatted as "Weekday, day. month"
 * @param date
 * @returns Weekday, day. month
 */
export const weekdayAndDate = (date: Date | string) => {
  const d = new Date(date);

  return d.toLocaleDateString("nb-NO", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
};

export const onlyTimeHHMM = (date: Dateish) => {
  return format(new Date(date), "HH:mm");
};
