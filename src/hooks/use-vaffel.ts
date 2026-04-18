import { useQuery } from "@tanstack/react-query";

export type VaffelQueue = {
  user_id: string;
  display_name: string;
  total_orders: number;
}[];

const API_URL = "https://vaffel.echo-webkom.no/687650156262195217";

export function useVaffel() {
  return useQuery({
    queryKey: ["vaffel"],
    queryFn: async () => {
      const [queueRes, statusRes, totalRes] = await Promise.all([
        fetch(`${API_URL}/queue`),
        fetch(`${API_URL}/status`),
        fetch(`${API_URL}/total`)
      ]);

      const queue: VaffelQueue = await queueRes.json();
      const status: string = await statusRes.text();
      const total: number = await totalRes.json();

      return { queue, status, total };
    },
    refetchInterval: 1000
  });
}
