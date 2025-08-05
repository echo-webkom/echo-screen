import { sanity } from "../sanity";
import type { HungerGamesQueryResult } from "../sanity.types";

export const fetchAllHungerGames = async () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(yesterday.getHours() + 2);

  return await sanity.fetch<HungerGamesQueryResult>(hungerGames, { yesterday });
};

const hungerGames = `{
  "all": *[_type == "hungerGames" && isDead == true && _updatedAt <= $yesterday]{
    _id,
    "profile" : profile->{
      _id,
      name,
      picture,
    },
    isDead,
  },
  "recent": *[_type == "hungerGames" && _createdAt != _updatedAt && _updatedAt >= $yesterday && isDead == true] {
    _id,
    "profile": profile->{
      _id,
      name,
      picture,
    },
    isDead,
  }
}
`;
