import { useUpcomingHappenings } from "../hooks/use-upcoming-happenings";

import { addDays, isSameDay, startOfWeek } from "date-fns";

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
      <div className="grid grid-cols-7 h-full border">
        {days.map((day) => {
          const isToday = isSameDay(day, new Date());
          const happeningsThisDay = happenings?.filter((happening) => {
            return happening.date ? isSameDay(happening.date, day) : "Ingenting"
           
          });
          return (
            <div
              key={day.toString()}
              className={`border ${isToday ? "bg-blue-200" : ""}`}
            >
              <div className="border-b-2 p-3 flex justify-center">
              {isToday ? (
                <p>I dag</p>
              ) : (
                <>
                  <p>Ikke idag</p>
                </>
              )}

              </div>
              {happeningsThisDay?.map((happening) => {
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
