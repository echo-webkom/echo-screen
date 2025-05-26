import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ScreenCycle } from "./components/screen-cycle";
import { CalendarScreen } from "./pages/calendar-screen";
import { TransportScreen } from "./pages/transport-screen";
import DateTime from "./components/date-time";


export default function App() {
  const [queryClient] = useState(() => new QueryClient());

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
          <ScreenCycle screens={[CalendarScreen, TransportScreen]} />
      </main>
    </QueryClientProvider>
  );
}



