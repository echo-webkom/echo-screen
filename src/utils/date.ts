import { format, isAfter, isBefore } from "date-fns";
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

/**
 * Checks if a given date is between two dates
 * @param date the date to check
 * @param startDate earliest date
 * @param endDate endDate
 * @returns if the date is between the two dates
 */
export const dateIsBetween = (
  date: Date,
  startDate: Date,
  endDate: Date
): boolean => {
  return isAfter(date, startDate) && isBefore(date, endDate);
};

export const onlyTimeHHMM = (date: Dateish) => {
  return format(new Date(date), "HH:mm");
};

export const onlyDayName = (date: Dateish) => {
  const d = new Date(date);
  return capitalize(format(d, "EEEE", { locale: nb }));
};

export const shortDate = (date: Dateish) => {
  return capitalize(format(date, "EEE. d. MMM", { locale: nb }));
};

export const dateAndTime = (date: Dateish) => {
  return capitalize(format(date, "d. MMM HH:mm", { locale: nb }));
};

export const capitalize = (string: string) => {
  return string.charAt(0).toLocaleUpperCase() + string.slice(1);
};

export const isFuture = (date: Dateish) => {
  return isAfter(new Date(date), new Date());
};

export const hasBeen = (date: Dateish) => {
  return isBefore(new Date(date), new Date());
};
