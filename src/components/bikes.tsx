import { useEffect, useState } from "react";

interface StationInfo {
  station_id: string;
  name: string;
}

interface StationStatus {
  station_id: string;
  num_bikes_available: number;
}

const BikeInfo: React.FC = () => {
  const [floridaBikeCount, setFloridaBikeCount] = useState<number | null>(null);

  const urlStatus =
    "https://gbfs.urbansharing.com/bergenbysykkel.no/station_status.json";
  const urlInfo =
    "https://gbfs.urbansharing.com/bergenbysykkel.no/station_information.json";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const infoResponse = await fetch(urlInfo);
        const infoData = await infoResponse.json();

        const statusResponse = await fetch(urlStatus);
        const statusData = await statusResponse.json();

        const stationsInfo: StationInfo[] = infoData.data.stations;
        const floridaStation = stationsInfo.find(
          (station) => station.name === "Florida Bybanestopp"
        );

        if (floridaStation) {
          const stationsStatus: StationStatus[] = statusData.data.stations;
          const floridaStatus = stationsStatus.find(
            (station) => station.station_id === floridaStation.station_id
          );

          setFloridaBikeCount(floridaStatus?.num_bikes_available || 0);
        }
      } catch (e) {
        console.error("Error fetching data: ", e);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="text-center flex-auto rounded-lg bg-background/70 border-2 shadow-lg ">
      {floridaBikeCount !== null && (
        <p className="text-center p-2 font-semibold text-lg">
          Bysykler ved Florida:{" "}
          {floridaBikeCount > 0 ? (
            <span className="text-3xl">{"🚲".repeat(floridaBikeCount)}</span>
          ) : (
            <span className="font-normal">ingen 🥲</span>
          )}
        </p>
      )}
    </div>
  );
};

export default BikeInfo;
