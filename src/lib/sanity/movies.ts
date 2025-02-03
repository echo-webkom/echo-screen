import { sanity, urlFor } from "../sanity";
import { MoviesQueryResult } from "../sanity.types";

export type Movie = {
  _id: string;
  title: string;
  date: string;
  link: string;
  image: string;
};

export const fetchMovies = async () => {
  const movies = await sanity.fetch<MoviesQueryResult>(moviesQuery);
  return movies.map((movie) => ({
    ...movie,
    image: urlFor(movie.image).url(),
  }));
};

const moviesQuery = `
*[_type == "movie"
  && !(_id in path('drafts.**'))]
  | order(_createdAt desc) {
  _id,
  title,
  date,
  link,
  image,
}
`;
