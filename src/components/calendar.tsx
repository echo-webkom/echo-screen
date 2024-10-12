import { useState } from "react";
import {
  HappeningType,
  useUpcomingHappenings,
} from "../hooks/use-upcoming-happenings";
import { onlyTimeHHMM, shortDate } from "../utils/date";
import { isSameDay } from "date-fns";

export default function Calendar() {
  const [happeningTypes] = useState<Array<HappeningType>>([
    "bedpres",
    "event",
    "external",
  ]);
  const { happenings } = useUpcomingHappenings(happeningTypes);
  const today = new Date();
  const weekdates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() + i);
    return date;
  });

  return (
    <div className="text-center h-full border-2 rounded-md">
      <div className="grid grid-cols-7 h-full divide-x">
        {weekdates.map((date) => (
          <div key={date.toString()}>
            <p className="border-b p-1 my-auto font-semibold">
              {date.toDateString() == new Date().toDateString()
                ? "I dag"
                : shortDate(date)}
            </p>
            <div className="space-y-3 p-1">
              {happenings?.map((happening) => {
                const happeningDate = new Date(happening.date);
                const currentDate = date;
                return (
                  isSameDay(happeningDate, currentDate) && (
                    <div
                      key={happening._id}
                      className={`h-10 border-l-4 pl-1 ${
                        happening.happeningType == "bedpres"
                          ? "border-primary"
                          : "border-secondary"
                      }`}
                    >
                      <p className="text-gray-500 text-xs">{happening.title}</p>
                      <p className=" text-gray-500 text-xs">
                        {onlyTimeHHMM(happening.date)}
                      </p>
                    </div>
                  )
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
