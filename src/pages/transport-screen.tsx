import { Bysykkel } from "../components/bysykkel";
import EnTurTimetable from "../components/entur-timetable";

export const TransportScreen = () => {
  return (
    <div className="w-full h-full">
      <EnTurTimetable />
      <Bysykkel />
    </div>
  );
};
