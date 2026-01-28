// import BdayCountDown from "../components/birthday-countdown";
// import BedpressCountDown from "../components/bedpress-count-down";
import Calendar from "../components/calendar";
import { Orakel } from "../components/orakel";
import TodaysBirthdays from "../components/todays-birthdays";
// import SnowMinimal from "../components/christmas-decoration";
import HeartsMinimal from "../components/valentines";

export const CalendarScreen = () => {
  return (
    <div className="w-full h-full flex flex-col gap-7">
      <Calendar />
      <div className="flex gap-7">
        <Orakel />
        <TodaysBirthdays />
        <HeartsMinimal />
      </div>
    </div>
  );
};
