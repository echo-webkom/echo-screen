import { useQuery } from "@tanstack/react-query";

const API_URL = "https://uno.echo-webkom.no/weather/yr";
export type WeatherData = {
  temperature: string;
  condition: string;
  wind_speed: string;
};

export const useWeather = () => {
  return useQuery({
    queryKey: ["weather"],
    queryFn: async () => {
      const weather = await fetch(API_URL).then((res) => res.json() as Promise<WeatherData>);
      return weather;
    }
  });
};
