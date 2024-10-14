import { useQuery } from "@tanstack/react-query";
import { sanity, urlFor } from "../lib/sanity";

export type Movie = {
  _id: string;
  title: string;
  date: string;
  link: string;
  image: string;
};

export const fetchMovies = async (): Promise<Array<Movie>> => {
  const movies = await sanity.fetch<Array<Movie>>(
    `*[_type == "movie" && !(_id in path('drafts.**'))] 
      | order(date asc) {
        _id,
        title,
        date,
        link,
        image
      }`
  );

  return movies.map((movie) => ({
    ...movie,
    image: urlFor(movie.image).url(),
  }));
};

export const useNextMovie = () => {
  return useQuery({
    queryKey: ["nextMovie"],
    queryFn: async () => {
      const movies = await fetchMovies();
      const today = new Date();

      const upcomingMovies = movies
        .filter((movie) => new Date(movie.date) > today)
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

      return upcomingMovies.length > 0 ? upcomingMovies[0] : null;
    },
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
