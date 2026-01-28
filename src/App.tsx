import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ScreenCycle } from "./components/screen-cycle";
import { CalendarScreen } from "./pages/calendar-screen";
import { MessageScreen } from "./pages/message-screen";
import { TransportScreen } from "./pages/transport-screen";
import DateTime from "./components/date-time";
import { isAugust, isValentinesSeason } from "./utils/date";
import WelcomeScreen from "./pages/welcome-screen";


export default function App() {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    const interval = setInterval(
      () => {
        window.location.reload();
      },
      4 * 60 * 60 * 1000
    );
    return () => clearInterval(interval);
  }, []);

  const visibleScreens = [CalendarScreen, TransportScreen, MessageScreen];
  if (isAugust()) {
    visibleScreens.push(WelcomeScreen);
  }

  const isValentines =isValentinesSeason();

  return (
    <QueryClientProvider client={queryClient}>
      <main className={`p-8 pb-0 space-y-5 h-screen flex flex-col ${
    isValentines
      ? "bg-gradient-to-tl from-pink-400 via-pink-200 to-pink-300"
      : ""
  }`}>
        <DateTime />
        <ScreenCycle screens={visibleScreens} />
      </main>
    </QueryClientProvider>
  );
}
