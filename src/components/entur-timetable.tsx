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
    <div className="flex-auto text-center rounded-lg bg-background/70 border-2 shadow-lg overflow-hidden">
      <div className="p-1 w-full font-semibold text-3xl">
        <h1 className="flex justify-center">
          Avganger fra {data.stopPlace.name}
        </h1>
      </div>

      <div className="min-w-full">
        <table className="text-left w-full">
          <thead className="border-b">
            <tr>
              <th className="px-5">
                <p className="font-semibold">Avgang</p>
                <p className="text-xs font-normal">Departure</p>
              </th>
              <th className="px-5">
                <p className="font-semibold">Linje</p>
                <p className="text-xs font-normal">Route</p>
              </th>
              <th className="px-5">
                <p className="font-semibold">Destinasjon</p>
                <p className="text-xs font-normal">Destination</p>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {data.stopPlace.estimatedCalls
              .filter((call: EstimatedCall) => {
                const timeDifference = getTimeDifferenceInMinutes(
                  call.expectedArrivalTime
                );
                return timeDifference >= 0;
              })
              .map((call: EstimatedCall, index: number) => {
                const timeDifference = getTimeDifferenceInMinutes(
                  call.expectedArrivalTime
                );

                const displayTime =
                  timeDifference < 15 ||
                  call.expectedArrivalTime !== call.aimedArrivalTime
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
                    <td className="px-5">{displayTime}</td>
                    <td className="px-5">{routeID}</td>
                    <td className="px-5">
                      {call.destinationDisplay.frontText}
                    </td>
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
