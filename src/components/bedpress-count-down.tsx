import { useEffect, useState } from "react";
import { useNextBedpres } from "../hooks/use-happenings";

export default function BedpressCountDown() {
  const { nextBedpres } = useNextBedpres();

  const [timeDifference, setTimeDifference] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeDifference(
        new Date(nextBedpres?.registrationStart || 0).getTime() -
          new Date().getTime()
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, [nextBedpres?.registrationStart]);

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  if (!nextBedpres) {
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
