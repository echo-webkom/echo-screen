import { useQuery } from "@tanstack/react-query";
import { getCalendarEvents } from "../lib/calendar-events";
import { fetchAllHappenings } from "../lib/sanity/happenings";
import { fetchMovies } from "../lib/sanity/movies";

export type HappeningType = "bedpres" | "event" | "external";

export function useHappenings(dates: Date[]) {
  const { data: happenings, ...rest } = useQuery({
    queryKey: ["happening"],
    queryFn: async () => {
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);
      const happenings = await getCalendarEvents();
      const filtered = happenings.filter(
        (happening) =>
          happening.date >= lastWeek &&
          happening.date <= dates[dates.length - 1]
      );

      return filtered;
    },
  });

  return {
    happenings,
    ...rest,
  };
}

export function useNextBedpres() {
  const { data: nextBedpres, ...rest } = useQuery({
    queryKey: ["next-bedpres"],
    queryFn: async () => {
      const happenings = await fetchAllHappenings();

      const filtered = happenings
        .filter(
          (happening) =>
            happening.happeningType === "bedpres" &&
            happening.registrationStart &&
            new Date(happening.registrationStart) >= new Date()
        )
        .sort((a, b) => {
          const dateA = new Date(a.registrationStart || 0).getTime();
          const dateB = new Date(b.registrationStart || 0).getTime();
          return dateA - dateB;
        });

      return filtered[0] ?? null;
    },
  });

  return {
    nextBedpres,
    ...rest,
  };
}

export function useNextMovie() {
  const { data: nextMovie, ...rest } = useQuery({
    queryKey: ["next-movie"],
    queryFn: async () => {
      const movies = await fetchMovies();
      const upcomingMovies = movies
        .filter(
          (movie) => movie.date && new Date(movie.date).getTime() >= Date.now()
        )
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

      return upcomingMovies[0] ?? null;
    },
  });

  return {
    nextMovie,
    ...rest,
  };
}
