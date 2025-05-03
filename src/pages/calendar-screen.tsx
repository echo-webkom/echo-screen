import Calendar from "../components/calendar";
import { Orakel } from "../components/orakel";
import TodaysBirthdays from "../components/todays-birthdays";

export const CalendarScreen = () => {
  return (
    <div className="w-full h-full flex flex-col gap-7">
      <Calendar />
      <div className="flex gap-7">
        {/* <BedpressCountDown /> */}
        <Orakel />
        <TodaysBirthdays />
      </div>
    </div>
  );
};
