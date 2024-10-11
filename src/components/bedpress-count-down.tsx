import { useEffect, useState } from "react";
import { useUpcomingHappenings } from "../hooks/use-upcoming-happenings";

export default function BedpressCountDown() {
  const { happenings } = useUpcomingHappenings(["bedpres"]);

  const nextBedpresDate = new Date(happenings?.at(0)?.registrationStart ?? NaN);

  const [timeDifference, setTimeDifference] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeDifference(nextBedpresDate.getTime() - new Date().getTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  return (
    <>
    {happenings ? (
      <div className=" text-center">
        <h1 className="font-semibold text-4xl pt-6 pb-6">
          {happenings?.at(0)?.title}
        </h1>
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
    ) : (
      <h1 className="flex justify-center pt-20 font-semibold text-lg">Ingen bedriftspresentasjoner {`:(`}</h1>
    )}
    </>
  );
}
