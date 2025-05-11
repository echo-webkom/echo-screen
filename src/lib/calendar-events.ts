import {
  happeningsToCalendarEvent,
  moviesToCalendarEvent,
  repeatingEventsToCalendarEvent
} from "./calendar-event-helpers";
import { fetchAllHappenings } from "./sanity/happenings";
import { fetchAllRepeatingHappenings } from "./sanity/repeating-happening";
import { fetchMovies } from "./sanity/movies";

export const getCalendarEvents = async () => {
  const [happenings, repeatingHappenings, movies] = await Promise.all([
    fetchAllHappenings(),
    fetchAllRepeatingHappenings(),
    fetchMovies()
  ]);

  return happeningsToCalendarEvent(happenings)
    .concat(moviesToCalendarEvent(movies))
    .concat(repeatingEventsToCalendarEvent(repeatingHappenings));
};
