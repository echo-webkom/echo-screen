import { sanity } from "../sanity"
import { HungerGamesQueryResult } from "../sanity.types";

export const fetchAllHungerGames = async () => {
    return await sanity
    .fetch<HungerGamesQueryResult>(hungerGames, {yesterday})
}

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
`
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);