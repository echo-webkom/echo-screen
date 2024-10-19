import { useState } from "react";
import {
  HappeningType,
  useUpcomingHappenings,
} from "../hooks/use-upcoming-happenings";
import {
  dateIsBetween,
  onlyDayName,
  onlyTimeHHMM,
} from "../utils/date";
import { isSameDay } from "date-fns";
import { useNextMovie } from "../hooks/use-upcoming-movies";
import { cn } from "../lib/cn";

export default function Calendar() {
  const [happeningTypes] = useState<Array<HappeningType>>([
    "bedpres",
    "event",
    "external",
  ]);

  const { happenings = [] } = useUpcomingHappenings(happeningTypes);
  const { data: nextMovie } = useNextMovie();
  const today = new Date();

  const weekdays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setDate(today.getDate() + i);
    return date;
  });

  return (
    <div className="text-center rounded-lg bg-background/70 border-2 overflow-hidden shadow-lg">
      <div className="grid grid-cols-7 h-full divide-x">
        {weekdays.map((day) => {
          const isToday = isSameDay(day, new Date());
          const happeningsThisDay = happenings
            .filter((happening) => {
              return happening.endDate
                ? isSameDay(new Date(happening.date), day) ||
                    dateIsBetween(
                      day,
                      new Date(happening.date),
                      new Date(happening.endDate)
                    )
                : isSameDay(new Date(happening.date), day);
            })
            .sort((a, b) => {
              if (a.endDate && !b.endDate) return -1;
              if (!a.endDate && b.endDate) return 1;
              return 0;
            });

          return (
            <div key={day.toString()}>
              <p className="border-b bg-muted p-1 my-auto font-semibold">
                {isToday ? (
                  <p className="flex flex-col justify-center">I dag</p>
                ) : (
                  <div className="flex flex-col">
                    <div>{onlyDayName(day)}</div>
                  </div>
                )}
              </p>
              <div className="p-1">
                {happeningsThisDay.map((happening) => {
                  const isFirstDay = isSameDay(happening.date, day);
                  const isLastDay = happening.endDate
                    ? isSameDay(day, happening.endDate)
                    : true;
                  return (
                    <div
                      key={happening._id}
                      className={cn("border-l-4 pl-1 text-left py-1", {
                        "border-primary": happening.happeningType == "bedpres",
                        "border-secondary": happening.happeningType == "event",
                        "border-slate-400": happening.happeningType == "external",
                      })}
                    >
                      <p className="text-sm line-clamp-1">{happening.title}</p>
                      <p className="text-gray-400 text-xs">
                        {isFirstDay && <p>{onlyTimeHHMM(happening.date)}</p>}
                        {isLastDay && !isFirstDay && happening.endDate && (
                          <p>{onlyTimeHHMM(happening.endDate)}</p>
                        )}
                      </p>
                    </div>
                  );
                })}
                {nextMovie && isSameDay(nextMovie.date, day) && (
                  <div className="border-l-4 pl-1 text-left space-y-1 border-pink-400">
                    <p className="text-sm line-clamp-1">
                      {"Film: " + nextMovie.title}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {onlyTimeHHMM(nextMovie.date)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
