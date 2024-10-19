import { useQuery } from "@tanstack/react-query";
import { sanity } from "../lib/sanity";

export type HappeningType = "bedpres" | "event" | "external";

export function useUpcomingHappenings(
  happeningTypes: Array<HappeningType> = ["bedpres", "event", "external"]
) {
  const { data: happenings, ...rest } = useQuery({
    queryKey: ["happening", ...happeningTypes],
    queryFn: async () => {
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);

      return await sanity.fetch<
        Array<{
          _id: string;
          title: string;
          date: string ;
          endDate: string | null;
          registrationStart: string | null;
          happeningType: HappeningType;
        }>
      >(
        `*[_type == "happening" && date > $lastWeek && happeningType in $happeningTypes] | order(date asc){
          _id,
          title,
          date,
          endDate,
          "registrationStart": registrationStart,
          happeningType
        }`,
        { happeningTypes, lastWeek }
      );
    },
  });

  return {
    happenings,
    ...rest,
  };
}
