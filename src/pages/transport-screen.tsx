import { Bysykkel } from "../components/bysykkel";
import EnTurTimetable from "../components/entur-timetable";
import { Weather } from "../components/weather";
import SnowMinimal from "../components/christmas-decoration";

export const TransportScreen = () => {
  return (
    <div className="w-full h-full">
      <EnTurTimetable />
      <Bysykkel />
      <Weather />
      <SnowMinimal />
    </div>
  );
};
