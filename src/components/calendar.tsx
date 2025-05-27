import { dateIsBetween, getCurrentWeekDates, onlyDayName, onlyTimeHHMM } from "../utils/date";
import { isSameDay } from "date-fns";
import { cn } from "../lib/cn";
import { useHappenings } from "../hooks/use-happenings";

export default function Calendar() {
  const days = getCurrentWeekDates();
  const { happenings = [] } = useHappenings(days);

  const getDayHappenings = (day: Date) => {
    return happenings
      .filter(({ date, endDate }) => {
        const start = new Date(date);
        const end = endDate ? new Date(endDate) : start;
        return isSameDay(start, day) || dateIsBetween(day, start, end);
      })
      .sort((a, b) =>
        a.date && b.date ? new Date(a.date).getTime() - new Date(b.date).getTime() : 0
      );
  };

  return (
    <div className="text-center rounded-lg bg-background/70 border-2 overflow-hidden shadow-lg h-60">
      <div className="grid grid-cols-7 h-full divide-x">
        {days.map((day) => {
          const isToday = isSameDay(day, new Date());
          const dayHappenings = getDayHappenings(day);
          return (
            <div key={day.toISOString()}>
              <p
                className={cn("border-b p-1 font-semibold", {
                  "bg-primary/30": isToday,
                  "bg-primary/10": !isToday
                })}
              >
                {onlyDayName(day)}
              </p>
              <div className="p-1">
                {dayHappenings.map(({ id, date, endDate, title, type }) => {
                  const isFirstDay = isSameDay(date, day);
                  const isLastDay = endDate ? isSameDay(day, endDate) : true;

                  return (
                    <div
                      key={id}
                      className={cn("border-l-4 pl-1 text-left py-1", {
                        "border-primary": type === "bedpres",
                        "border-secondary": type === "event",
                        "border-green-500": type === "boardgame",
                        "border-pink-500": type === "movie",
                        "border-slate-500": type === "other"
                      })}
                    >
                      <p className="text-sm line-clamp-1">
                        {type === "bedpres" ? "Bedpres: " : type === "movie" ? "Film: " : ""}
                        {title}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {isFirstDay && <span>{onlyTimeHHMM(date)}</span>}
                        {isLastDay && !isFirstDay && endDate && (
                          <span>{onlyTimeHHMM(endDate)}</span>
                        )}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
