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

const fetchBysykkelData = async (): Promise<BikeData[]> => {
  const stationList = ["Florida Bybanestopp", "Høyteknologisenteret"];
  const urlStatus =
    "https://gbfs.urbansharing.com/bergenbysykkel.no/station_status.json";
  const urlInfo =
    "https://gbfs.urbansharing.com/bergenbysykkel.no/station_information.json";

  try {
    const [infoResponse, statusResponse] = await Promise.all([
      fetch(urlInfo),
      fetch(urlStatus),
    ]);

    if (!infoResponse.ok || !statusResponse.ok) {
      throw new Error("Failed to fetch data");
    }

    const infoData = await infoResponse.json();
    const statusData = await statusResponse.json();

    const stationsInfo: StationInfo[] = infoData?.data?.stations || [];
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

const useBysykkel = (interval: number = 5000) => {
  return useQuery<BikeData[]>({
    queryKey: ["bysykkelData"],
    queryFn: fetchBysykkelData,
    refetchInterval: interval,
  });
};

export default useBysykkel;
