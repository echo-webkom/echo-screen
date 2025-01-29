import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DateTime from "./components/date-time";
import BentoScreen from "./components/bento-screen";
import { useReloadUpdate } from "./hooks/use-current-head";

export default function App() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {import.meta.env.PROD && <Reload />}
      <div className="p-8 pb-0 space-y-5">
        <div>
          <DateTime />
        </div>
        <BentoScreen />
      </div>
    </QueryClientProvider>
  );
}

const Reload = () => {
  useReloadUpdate();
  return null;
};
