import { useState } from "react";
import {
  HappeningType,
  useUpcomingHappenings,
} from "../hooks/use-upcoming-happenings";
import { onlyTimeHHMM, shortDate } from "../utils/date";
import { isSameDay } from "date-fns";
import { useNextMovie } from "../hooks/use-upcoming-movies";

export default function Calendar() {
  const [happeningTypes] = useState<Array<HappeningType>>([
    "bedpres",
    "event",
    "external",
  ]);

  const { happenings } = useUpcomingHappenings(happeningTypes);
  const { data: nextMovie } = useNextMovie();
  const today = new Date();

  const weekdates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() + i);
    return date;
  });

  return (
    <div className="text-center rounded-lg bg-background">
      <div className="grid grid-cols-7 h-full divide-x ">
        {weekdates.map((date) => (
          <div key={date.toString()}>
            <p className="border-b bg-muted p-1 my-auto font-semibold rounded-t-lg">
              {date.toDateString() == new Date().toDateString()
                ? "I dag"
                : shortDate(date)}
            </p>
            <div className="space-y-3 p-1 ">
              {happenings?.map((happening) => {
                const happeningDate = new Date(happening.date);
                const currentDate = date;

                return (
                  isSameDay(happeningDate, currentDate) && (
                    <div
                      key={happening._id}
                      className={`border-l-4 pl-1 text-left space-y-1 ${
                        happening.happeningType == "bedpres"
                          ? "border-primary"
                          : "border-secondary"
                      }`}
                    >
                      <p className="text-sm line-clamp-2">{happening.title}</p>
                      <p className="text-gray-400 text-xs">
                        {onlyTimeHHMM(happening.date)}
                      </p>
                    </div>
                  )
                );
              })}
              {nextMovie && isSameDay(nextMovie.date, date) && (
                <div className="border-l-4 pl-1 text-left space-y-1 border-pink-400">
                  <p className="text-sm line-clamp-2">
                    {"Film: " + nextMovie.title}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {onlyTimeHHMM(nextMovie.date)}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
