import { useEffect } from "react";
import { ScreenCycle } from "./components/screen-cycle";
import { CalendarScreen } from "./pages/calendar-screen";
import { MessageScreen } from "./pages/message-screen";
import { TransportScreen } from "./pages/transport-screen";
import DateTime from "./components/date-time";
import { isAugust, isMsgExpired, isValentinesSeason } from "./utils/date";
import WelcomeScreen from "./pages/welcome-screen";
import { AutoReload } from "./components/auto-reload";
import { useMessage } from "./hooks/use-message";

export default function App() {
  const { data: message } = useMessage();

  useEffect(() => {
    const interval = setInterval(
      () => {
        window.location.reload();
      },
      4 * 60 * 60 * 1000
    );
    return () => clearInterval(interval);
  }, []);

  const visibleScreens = [CalendarScreen, TransportScreen];
  if (isAugust()) {
    visibleScreens.push(WelcomeScreen);
  }

  if (message?.title && message?.body && isMsgExpired(message._createdAt)) {
    visibleScreens.push(MessageScreen);
  }

  const isValentines = isValentinesSeason();
  document.body.classList.toggle("valentines", isValentines);

  return (
    <>
      <AutoReload />
      <main
        className={`px-6 pt-6 pb-0 space-y-5 h-screen flex flex-col ${
          isValentines ? "bg-linear-to-tl from-pink-400 via-pink-200 to-pink-300" : ""
        }`}
      >
        <DateTime />
        <ScreenCycle screens={visibleScreens} />
      </main>
    </>
  );
}
