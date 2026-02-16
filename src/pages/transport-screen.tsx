import { Bysykkel } from "../components/bysykkel";
import EnTurTimetable from "../components/entur-timetable";
// import SnowMinimal from "../components/christmas-decoration";
// import HeartsMinimal from "../components/valentines";

export const TransportScreen = () => {
  return (
    <div className="w-full h-full">
      <EnTurTimetable />
      <Bysykkel />
    </div>
  );
};
