import { useQuery } from "@tanstack/react-query";

const API_URL = import.meta.env.PROD ? "https://api.echo-webkom.no" : "http://localhost:8000"
  
export const useBirthdays = () => {
  return useQuery({
    queryKey: ["birthdays"],
    queryFn: async () => {
      const birthdays = await fetch(`${API_URL}/birthdays`).then((res) => res.json() as Promise<Array<string>>);
      return birthdays
    }
  })
}