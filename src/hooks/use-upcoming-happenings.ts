import { useQuery } from "@tanstack/react-query";
import { sanity } from "../lib/sanity";

export type HappeningType = "bedpres" | "event" | "external";

export function useUpcomingHappenings(
  happeningTypes: Array<HappeningType> = ["bedpres", "event", "external"]
) {
  const { data: happenings, ...rest } = useQuery({
    queryKey: ["happening", ...happeningTypes],
    queryFn: async () => {
      return await sanity.fetch<
        Array<{
          _id: string;
          title: string;
          date: string | number | Date;
          endDate: string | number | Date;
          registrationStart: string | null;
          happeningType: HappeningType;
        }>
      >(
        `*[_type == "happening" && date > now() && happeningType in $happeningTypes] | order(date asc){
          _id,
          title,
          date,
          endDate,
          "registrationStart": registrationStart,
        }`,
        { happeningTypes }
      );
    },
  });

  return {
    happenings,
    ...rest,
  };
}
