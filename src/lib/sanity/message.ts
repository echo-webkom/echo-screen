import { sanity } from "../sanity";

const messageQuery = `
*[_type == "post" && "board" in authors[]->groupType]
| order(_createdAt desc)[0]{
  title,
  "body": coalesce(pt::text(body), body),
  "createdAt": _createdAt
}
`;

export const fetchMessages = async () => {
  return await sanity.fetch(messageQuery);
};
