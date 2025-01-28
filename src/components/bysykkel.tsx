import { useEffect, useState } from "react";
import { BiCycling } from "react-icons/bi";

interface StationInfo {
  station_id: string;
  name: string;
}

interface StationStatus {
  station_id: string;
  num_bikes_available: number;
}

export function Bysykkel() {
  const [floridaBikeCount, setFloridaBikeCount] = useState<number | null>(null);
  const [hoytekBikeCount, setHoytekBikeCount] = useState<number | null>(null);

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
        const hoytekStation = stationsInfo.find(
          (station) => station.name === "Høyteknologisenteret"
        );

        if (floridaStation) {
          const stationsStatus: StationStatus[] = statusData.data.stations;
          const floridaStatus = stationsStatus.find(
            (station) => station.station_id === floridaStation.station_id
          );

          setFloridaBikeCount(floridaStatus?.num_bikes_available || 0);
          // setFloridaBikeCount(5);
        }

        if (hoytekStation) {
          const stationsStatus: StationStatus[] = statusData.data.stations;
          const hoytekStatus = stationsStatus.find(
            (station) => station.station_id === hoytekStation.station_id
          );

          setHoytekBikeCount(hoytekStatus?.num_bikes_available || 0);
          // setHoytekBikeCount(10);
        }
      } catch (e) {
        console.error("Error fetching data: ", e);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex gap-10 my-10">
      <div className="bg-white/25 rounded-md w-1/2 px-4 py-3 space-y-2">
        <h2 className="font-medium">Bysykler ved Florida:</h2>
        <>
          {floridaBikeCount !== null ? (
            floridaBikeCount > 0 ? (
              <div className="flex gap-2 flex-wrap">
                {Array.from({ length: floridaBikeCount }, (_, index) => (
                  <BiCycling key={index} />
                ))}
              </div>
            ) : (
              <p className="text-sm ">Ingen sykler tilgjengelig</p>
            )
          ) : (
            <p>Laster ... </p>
          )}
        </>
      </div>

      <div className="bg-white/25 rounded-md w-1/2 px-4 py-3 space-y-2">
        <h2 className="font-medium">Bysykler ved Høyteknologisenteret:</h2>
        <>
          {hoytekBikeCount !== null ? (
            hoytekBikeCount > 0 ? (
              <div className="flex gap-2 flex-wrap">
                {Array.from({ length: hoytekBikeCount }, (_, index) => (
                  <BiCycling key={index} />
                ))}
              </div>
            ) : (
              <p className="text-sm">Ingen sykler tilgjengelig</p>
            )
          ) : (
            <p>Laster ... </p>
          )}
        </>
      </div>
    </div>
  );
}

export default Bysykkel;
