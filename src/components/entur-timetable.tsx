import { FaBus } from "react-icons/fa";
import { BiSolidTrain } from "react-icons/bi";

import useUpcomingDepartures, {
  EstimatedCall,
} from "../hooks/use-upcoming-departures";
import {
  extractRouteNumber,
  formatTime,
  getTimeDifferenceInMinutes,
} from "../utils/timetableUtils";

const EnTurTimetable = () => {
  const { data, isLoading, isError, error } = useUpcomingDepartures(5000);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div className="flex gap-10 mt-6">
      <div className="bg-white/30 rounded-md w-1/2 border-2">
        <h1 className="text-xl px-4 py-8 font-medium flex gap-2">
          <>Bybaneavganger fra {data.stopPlace.name}</>
          <BiSolidTrain className="my-auto size-6" />
        </h1>

        <table className="text-left w-full">
          <thead className="border-b ">
            <tr>
              <th className="px-4 py-1 font-medium">
                <p>Avgang</p>
              </th>
              <th className="font-medium">
                <p>Linje</p>
              </th>
              <th className="font-medium">
                <p>Destinasjon</p>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {data.stopPlace.estimatedCalls
              .filter((call: EstimatedCall) => {
                const timeDifference = getTimeDifferenceInMinutes(
                  call.expectedArrivalTime
                );
                return (
                  timeDifference >= 0 &&
                  extractRouteNumber(
                    call.serviceJourney.journeyPattern.line.id
                  ) === "1"
                );
              })
              .slice(0, 7)
              .map((call: EstimatedCall, index: number) => {
                const timeDifference = getTimeDifferenceInMinutes(
                  call.expectedArrivalTime
                );

                const displayTime =
                  call.aimedArrivalTime !== call.expectedArrivalTime
                    ? formatTime(call.aimedArrivalTime)
                    : timeDifference < 15
                    ? `${timeDifference} min`
                    : formatTime(call.expectedArrivalTime);

                const routeID = extractRouteNumber(
                  call.serviceJourney.journeyPattern.line.id
                );

                const uniqueKey = `${call.expectedArrivalTime}-${routeID}-${call.destinationDisplay.frontText}`;

                return (
                  <tr
                    key={uniqueKey}
                    className={index % 2 === 0 ? "bg-primary/5" : ""}
                  >
                    <td className="px-4 py-1">{displayTime}</td>
                    <td>{routeID}</td>
                    <td>{call.destinationDisplay.frontText}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      <div className="bg-white/30 rounded-md w-1/2 border-2">
        <h1 className="text-xl px-4 py-8 font-medium flex gap-2">
          <>Bussavganger fra {data.stopPlace.name}</>
          <FaBus className="my-auto" />
        </h1>

        <table className="text-left w-full">
          <thead className="border-b ">
            <tr>
              <th className="px-4 py-1 font-medium">
                <p>Avgang</p>
              </th>
              <th className="font-medium">
                <p>Linje</p>
              </th>
              <th className="font-medium">
                <p>Destinasjon</p>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {data.stopPlace.estimatedCalls
              .filter((call: EstimatedCall) => {
                const timeDifference = getTimeDifferenceInMinutes(
                  call.expectedArrivalTime
                );
                return (
                  timeDifference >= 0 &&
                  extractRouteNumber(
                    call.serviceJourney.journeyPattern.line.id
                  ) !== "1"
                );
              })
              .slice(0, 7)
              .map((call: EstimatedCall, index: number) => {
                const timeDifference = getTimeDifferenceInMinutes(
                  call.expectedArrivalTime
                );

                const displayTime =
                  call.aimedArrivalTime !== call.expectedArrivalTime
                    ? formatTime(call.aimedArrivalTime)
                    : timeDifference < 15
                    ? `${timeDifference} min`
                    : formatTime(call.expectedArrivalTime);

                const routeID = extractRouteNumber(
                  call.serviceJourney.journeyPattern.line.id
                );

                const uniqueKey = `${call.expectedArrivalTime}-${routeID}-${call.destinationDisplay.frontText}`;

                return (
                  <tr
                    key={uniqueKey}
                    className={index % 2 === 0 ? "bg-primary/5" : ""}
                  >
                    <td className="px-4 py-1">{displayTime}</td>
                    <td>{routeID}</td>
                    <td>{call.destinationDisplay.frontText}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnTurTimetable;
