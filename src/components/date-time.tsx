import { useState, useEffect } from "react";
import { weekdayAndDate } from "../utils/date";
import { getWeek } from "date-fns";

export default function DateTime() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const formattedDate =
    weekdayAndDate(currentTime).charAt(0).toUpperCase() +
    weekdayAndDate(currentTime).slice(1);

  const weekNumber = getWeek(currentTime);

  return (
    <div>
      <h1 className="text-4xl font-semibold flex justify-between items-center">
        <p className="text-left flex-1">{formattedDate}</p>
        <p className="text-center flex-1">Uke {weekNumber}</p>
        <p className="text-right flex-1">{formattedTime}</p>
      </h1>
    </div>
  );
}
