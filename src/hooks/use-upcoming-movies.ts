import { useQuery } from "@tanstack/react-query";
import { sanity, urlFor } from "../lib/sanity"; // Oppdater med riktig sti

// Typedefinisjon for Movie
export type Movie = {
  _id: string;
  title: string;
  date: string;
  link: string;
  image: string;
};

// Funksjon for å hente filmer fra Sanity
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

  // Bruk urlFor for å generere bildelinker
  return movies.map((movie) => ({
    ...movie,
    image: urlFor(movie.image).url(), // Generer URL for bildet
  }));
};

// Custom hook for å få den neste filmen
export const useNextMovie = () => {
  return useQuery({
    queryKey: ["nextMovie"],
    queryFn: async () => {
      const movies = await fetchMovies();
      const today = new Date();

      // Filtrer filmer som er senere enn dagens dato og sorter dem etter dato
      const upcomingMovies = movies
        .filter((movie) => new Date(movie.date) > today)
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

      // Returner den første kommende filmen, eller null hvis det ikke finnes noen
      return upcomingMovies.length > 0 ? upcomingMovies[0] : null;
    },
    staleTime: 60 * 1000, // Cache for 1 minutt
    refetchOnWindowFocus: false, // Ikke refetch når vinduet får fokus
  });
};
