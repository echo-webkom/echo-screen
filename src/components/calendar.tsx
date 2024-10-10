  import { useUpcomingHappenings } from "../hooks/use-upcoming-happenings";

import { addDays, isSameDay, startOfWeek } from "date-fns";
import { onlyDayName, yearMonthDateNoDay } from "../utils/date";


export default function Calendar() {
  const { happenings } = useUpcomingHappenings([
    "bedpres",
    "event",
    "external",
  ]);
  const date = startOfWeek(new Date(), { weekStartsOn: 1 });
  const days = Array.from({ length: 7 }, (_, i) => addDays(date, i));
  return (
    <div className="h-full">
      <div className="grid grid-cols-7 h-full ">
        {days.map((day) => {
          const isToday = isSameDay(day, new Date());
          const isFirstDay = isSameDay(date, day);
          const happeningsThisDay = happenings?.filter((happening) => {
            return happening.date ? isSameDay(happening.date, day) : "Ingenting"
           
          });
          return (
            <div
              key={day.toString()}
              className={`${isFirstDay ? "" : "border-l"}`}
            >
              <div className="border-b-2 flex justify-center font-medium bg-muted h-16 text-lg">
                {isToday ? (
                  <p className="py-4">I dag</p>
                ) : (
                  <div className="flex flex-col justify-center items-center">
                    <p>{onlyDayName(day)}</p>
                    <p>{yearMonthDateNoDay(day)}</p>
                  </div>
                )}
              </div> {happeningsThisDay?.map((happening) => {
                return (
                  <div key={happening._id}>
                    <h1>{happening.title}</h1>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
