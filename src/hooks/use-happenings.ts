import { useQuery } from "@tanstack/react-query";
import { getCalendarEvents } from "../lib/calendar-events";

export type HappeningType = "bedpres" | "event" | "external";

export function useHappenings(dates: Date[]) {
  const { data: happenings, ...rest } = useQuery({
    queryKey: ["happening"],
    queryFn: async () => {
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);
      const happenings = await getCalendarEvents();
      const filtered = happenings.filter(
        (happening) =>
          happening.date >= lastWeek &&
          happening.date <= dates[dates.length - 1]
      );

      return filtered;
    },
  });

  return {
    happenings,
    ...rest,
  };
}
