import { useState } from "react";
import Calender from "./components/calender";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <div className="m-16">
        <h1>Info her</h1>
        <Calender />
      </div>
    </QueryClientProvider>
  );
}
