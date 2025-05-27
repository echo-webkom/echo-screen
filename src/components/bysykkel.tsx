import { IoIosBicycle } from "react-icons/io";
import { useBysykkel, BikeData } from "../hooks/use-bysykkel";

export function Bysykkel() {
  const { data, isLoading, error } = useBysykkel();

  if (isLoading) return <p>Laster data...</p>;
  if (error) return <p>Det oppsto en feil: {error.message}</p>;
  if (!data) return <p>Ingen data tilgjengelig</p>;

  return (
    <div className="flex gap-10 my-10">
      {data?.map(({ station, bikeCount }) => (
        <DisplayBysykkel key={station} station={station} bikeCount={bikeCount} />
      ))}
    </div>
  );
}

function DisplayBysykkel(data: BikeData) {
  return (
    <div className="bg-white/30 rounded-md w-1/2 px-4 py-3 space-y-2 border-2">
      <h1 className="font-medium text-lg py-2">Bysykler ved {data.station}:</h1>
      <div>
        {data.bikeCount > 0 ? (
          <div className="flex gap-2 flex-wrap">
            {Array.from({ length: data.bikeCount }, (_, index) => (
              <IoIosBicycle key={index} className="size-6" />
            ))}
          </div>
        ) : (
          <p className="text-md pb-2">Ingen sykler tilgjengelig</p>
        )}
      </div>
    </div>
  );
}
