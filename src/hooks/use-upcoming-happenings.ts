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
        }>
      >(
        `*[_type == "happening" && date > now() && happeningType in $happeningTypes] | order(date asc)`,
        {
          happeningTypes,
        }
      );
    },
  });

  return {
    happenings,
    ...rest,
  };
}
