import { useQuery } from "@tanstack/react-query";

export type StopPlace = {
  id: string;
  name: string;
  estimatedCalls: EstimatedCall[];
};

export type EstimatedCall = {
  realtime: boolean;
  aimedArrivalTime: string;
  aimedDepartureTime: string;
  expectedArrivalTime: string;
  expectedDepartureTime: string;
  destinationDisplay: {
    frontText: string;
  };
  quay: {
    id: string;
  };
  serviceJourney: {
    journeyPattern: {
      line: {
        id: string;
      };
    };
  };
};

type Data = {
  stopPlace: StopPlace;
};

const fetchUpcomingDepartures = async (): Promise<Data> => {
  const query = `
  {
    stopPlace(id: "NSR:StopPlace:58544") {
      id
      name
      estimatedCalls(timeRange: 72100, numberOfDepartures: 10) {
        realtime
        aimedArrivalTime
        aimedDepartureTime
        expectedArrivalTime
        expectedDepartureTime
        destinationDisplay {
          frontText
        }
        quay {
          id
        }
        serviceJourney {
          journeyPattern {
            line {
              id
            }
          }
        }
      }
    }
  }`;

  const response = await fetch(
    "https://api.entur.io/journey-planner/v3/graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ET-Client-Name": "echo-echoScreen",
      },
      body: JSON.stringify({ query }),
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const result = await response.json();
  return result.data;
};

const useUpcomingDepartures = (interval: number = 5000) => {
  return useQuery<Data, Error>({
    queryKey: ["upcomingDepartures"],
    queryFn: fetchUpcomingDepartures,
    refetchInterval: interval,
  });
};

export default useUpcomingDepartures;
