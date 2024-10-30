// components/BikeStation.tsx
import { useEffect, useState } from "react";

const BikeStation: React.FC = () => {
  const [numBikes, setNumBikes] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBikeData = async () => {
      try {
        const response = await fetch(
          "https://gbfs.urbansharing.com/bergenbysykkel.no/station_status.json",
          {
            headers: {
              "Client-Identifier": "IDENTIFIER", // Replace with your actual identifier
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // Adjust this line to find your specific station
        const floridaStation = data.data.stations.find(
          (station: any) => station.name === "Florida Bike Station"
        );

        if (floridaStation) {
          setNumBikes(floridaStation.num_bikes_available);
        } else {
          setError("Florida Bike Station not found.");
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchBikeData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Florida Bike Station</h1>
      <p>Number of bikes available: {numBikes}</p>
    </div>
  );
};

export default BikeStation;
