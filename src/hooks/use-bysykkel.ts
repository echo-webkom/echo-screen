import { useQuery } from "@tanstack/react-query";

export type StationInfo = {
  station_id: string;
  name: string;
};

export type StationStatus = {
  station_id: string;
  num_bikes_available: number;
};

export type BikeData = {
  bikeCount: number;
  station: string;
};

const stationList = ["Florida Bybanestopp", "Høyteknologisenteret"];

const fetchBysykkelData = async (): Promise<Array<BikeData>> => {
  try {
    const [infoResponse, statusResponse] = await Promise.all([
      fetch(
        "https://gbfs.urbansharing.com/bergenbysykkel.no/station_information.json"
      ),
      fetch(
        "https://gbfs.urbansharing.com/bergenbysykkel.no/station_status.json"
      ),
    ]);

    if (!infoResponse.ok || !statusResponse.ok) {
      throw new Error("Failed to fetch data");
    }

    const infoData = await infoResponse.json();
    const statusData = await statusResponse.json();

    const stationsInfo: Array<StationInfo> = infoData?.data?.stations || [];
    const statusMap = new Map(
      statusData?.data?.stations.map((station: StationStatus) => [
        station.station_id,
        station.num_bikes_available,
      ])
    );

    return stationList.map((stationName) => {
      const stationInfo = stationsInfo.find(
        (station) => station.name === stationName
      );
      const bikeCount = stationInfo
        ? statusMap.get(stationInfo.station_id) ?? 0
        : 0;

      return {
        station: stationName,
        bikeCount: Number(bikeCount),
      };
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const useBysykkel = (interval: number = 5000) => {
  return useQuery<Array<BikeData>>({
    queryKey: ["bysykkelData"],
    queryFn: fetchBysykkelData,
    refetchInterval: interval,
  });
};
