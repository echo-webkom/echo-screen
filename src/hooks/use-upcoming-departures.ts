import { useEffect, useState } from "react";

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

const useUpcomingDepartures = (interval: number = 5000) => {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
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

    try {
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
      setData(result.data);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, interval);

    return () => clearInterval(intervalId);
  }, [interval]);

  return { data, loading, error };
};

export default useUpcomingDepartures;
