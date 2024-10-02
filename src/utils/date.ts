  export type Dateish = Date | string | number;
  
/**
 * Converts a date to a short date string.
 *
 * @example
 * Example: "1. jan. 2020, 12:00"
 *
 * @param date date to convert
 * @returns the date in short format
 */
export const shortDate = (date: Dateish | string) => {
    const d = new Date(date);
  
    return d.toLocaleTimeString("nb-NO", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZone: "Europe/Oslo",
    });
  };