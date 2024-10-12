import { useState, useEffect } from "react";
import { weekdayAndDate } from "../utils/date";

export default function DateTime() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  const formattedDate =
    weekdayAndDate(currentTime).charAt(0).toUpperCase() +
    weekdayAndDate(currentTime).slice(1);

  return (
    <div>
      <h1 className="text-4xl text-black flex justify-between">
        <p>{formattedDate}</p>
        <p>{formattedTime}</p>
      </h1>
    </div>
  );
}
