import { useEffect, useMemo, useState } from "react";
import { useUpcomingHappenings } from "../hooks/use-upcoming-happenings";
import { hasBeen } from "../utils/date";

export default function BedpressCountDown() {
  const { happenings } = useUpcomingHappenings(["bedpres"]);

  const nextBedpres = useMemo(
    () =>
      happenings?.find(
        (happening) => !hasBeen(new Date(happening.registrationStart ?? NaN))
      ),
    [happenings]
  );

  const nextBedpresDate = useMemo(
    () => new Date(nextBedpres?.registrationStart ?? NaN),
    [nextBedpres?.registrationStart]
  );
  const [timeDifference, setTimeDifference] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeDifference(nextBedpresDate.getTime() - new Date().getTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [nextBedpresDate]);

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  if (!happenings) {
    return (
      <h1 className="flex justify-center pt-20 font-semibold text-lg">
        Ingen bedriftspresentasjoner {`:(`}
      </h1>
    );
  }

  return (
    <div className="text-center flex-auto rounded-lg px-10 py-10 bg-background/70 border-2 shadow-lg">
      <h1 className="font-semibold text-4xl  pb-10">{nextBedpres?.title}</h1>
      <p className="pb-2">Påmelding om:</p>
      <div className="flex justify-center space-x-10">
        <div className="flex flex-col justify-center w-8">
          <h1 className="font-semibold text-2xl">{days}</h1>
          <p className="text-xs">Dager</p>
        </div>
        <div className="flex flex-col justify-center w-8">
          <h1 className="font-semibold text-2xl">{hours}</h1>
          <p className="text-xs">Timer</p>
        </div>
        <div className="flex flex-col justify-center w-8">
          <h1 className="font-semibold text-2xl">{minutes}</h1>
          <p className="text-xs">Min</p>
        </div>
        <div className="flex flex-col justify-center w-8">
          <h1 className="font-semibold text-2xl">{seconds}</h1>
          <p className="text-xs">Sek</p>
        </div>
      </div>
    </div>
  );
}
