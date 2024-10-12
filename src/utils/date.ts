import { format } from "date-fns";
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

export const yearMonthDateNoDay = (date: Date | string) => {
  const d = new Date(date);

  return d.toLocaleDateString("nb-NO", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const onlyTimeHHMM = (date: Dateish) => {
  return format(new Date(date), "HH:mm");
};

export const onlyDayName = (date: Dateish) => {
  const d = new Date(date);
  return capitalize(format(d, "EEEE", { locale: nb }));
};

export const shortDate = (date: Dateish) => {
  return capitalize(format(date, "EEE. d. MMM", { locale: nb })); // Using Norwegian locale
};

export const capitalize = (string: string) => {
  return string.charAt(0).toLocaleUpperCase() + string.slice(1);
};
