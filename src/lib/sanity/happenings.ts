import { sanity } from "../sanity";
import { AllHappeningsQueryResult } from "../sanity.types";

export const fetchAllHappenings = async () => {
  return await sanity
    .fetch<AllHappeningsQueryResult>(allHappeningsQuery)
    .catch(() => {
      console.error("Failed to fetch all happenings");

      return [];
    });
};

const allHappeningsQuery = `
*[_type == "happening"
  && !(_id in path('drafts.**'))]
  | order(date asc) {
    _id,
  _createdAt,
  _updatedAt,
  title,
  "slug": slug.current,
  isPinned,
  happeningType,
  "company": company->{
    _id,
    name,
    website,
    image,
  },
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
  "date": date,
  "endDate": endDate,
  cost,
  "registrationStartGroups": registrationStartGroups,
  "registrationGroups": registrationGroups[]->slug.current,
  "registrationStart": registrationStart,
  "registrationEnd": registrationEnd,
  "location": location->{
    name,
  },
  "spotRanges": spotRanges[] {
    spots,
    minYear,
    maxYear,
  },
  "additionalQuestions": additionalQuestions[] {
    id,
    title,
    required,
    type,
    options,
  },
  externalLink,
  body
}
`;
