import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ScreenCycle } from "./components/screen-cycle";
import { CalendarScreen } from "./pages/calendar-screen";
import { TransportScreen } from "./pages/transport-screen";
import { HungerGamesScreen } from "./pages/hunger-games-screen";
import DateTime from "./components/date-time";
import ShowRecentlyKilledPeople from "./pages/recently-killed-people";


export default function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [showRecentlyKilledPeople, setShowRecentlyKilledPeople] = useState(false);

  useEffect(() => {
    const checkNoon = () => {
      const now = new Date();
      if (now.getHours() === 12 &&
          now.getMinutes() > 0 && 
          now.getMinutes() < 5){
        setShowRecentlyKilledPeople(() => true);
      } else {
        setShowRecentlyKilledPeople(() => false)
      }
    }
    const interval = setInterval(checkNoon, 60000);
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 4 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <main className="p-8 pb-0 space-y-5 h-screen flex flex-col">
        <DateTime />
        {showRecentlyKilledPeople ? (
           <ShowRecentlyKilledPeople/> 
        ): (
          <ScreenCycle screens={[CalendarScreen, HungerGamesScreen, TransportScreen]} />
        )}
      </main>
    </QueryClientProvider>
  );
}



