import { sanity } from "../sanity";
import type { AllRepeatingHappeningsQueryResult } from "../sanity.types";

export const fetchAllRepeatingHappenings = async () => {
  return await sanity
    .fetch<AllRepeatingHappeningsQueryResult>(allRepeatingHappeningsQuery)
    .catch(() => {
      console.error("Failed to fetch all repeating happenings");

      return [];
    });
};

const allRepeatingHappeningsQuery = `
*[_type == "repeatingHappening"
  && !(_id in path('drafts.**'))] {
  _id,
  _type,
  title,
  "slug": slug.current,
  happeningType,
  "organizers": organizers[]->{
    _id,
    name,
    "slug": slug.current
  },
  "contacts": contacts[] {
    email,
    "profile": profile->{
      _id,
      name,
    },
  },
  "location": location->{
    name,
  },
  dayOfWeek,
  startTime,
  endTime,
  startDate,
  endDate,
  interval,
  cost,
  ignoredDates,
  externalLink,
  body,
}`;
