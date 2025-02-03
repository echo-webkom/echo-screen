import { dateIsBetween, onlyDayName, onlyTimeHHMM } from "../utils/date";
import { isSameDay } from "date-fns";
import { cn } from "../lib/cn";
import { useHappenings } from "../hooks/use-happenings";

export default function Calendar() {
  const today = new Date();
  const dayOfWeek = today.getDay();

  const startOfWeek = new Date(today);
  const diffToMonday = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
  startOfWeek.setDate(today.getDate() + diffToMonday);

  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    date.setHours(0, 0, 0, 0);
    return date;
  });

  const { happenings = [] } = useHappenings(days);

  return (
    <div className="text-center rounded-lg bg-background/70 border-2 overflow-hidden shadow-lg h-60">
      <div className="grid grid-cols-7 h-full divide-x">
        {days.map((day) => {
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
                      key={happening.id}
                      className={cn("border-l-4 pl-1 text-left py-1", {
                        "border-primary": happening.type == "bedpres",
                        "border-secondary": happening.type == "event",
                        "border-slate-400": happening.type == "other",
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
