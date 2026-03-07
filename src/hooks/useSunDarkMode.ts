import { useEffect } from "react";
import SunCalc from "suncalc";

export const useSunDarkMode = () => {
  useEffect(() => {
    const updateTheme = (lat: number, lon: number) => {
      const now = new Date();
      const times = SunCalc.getTimes(now, lat, lon);

      const shouldBeDark = true; //now > times.sunset || now < times.sunrise;

      document.documentElement.classList.toggle("dark", shouldBeDark);
    };

    navigator.geolocation.getCurrentPosition(({ coords }) => {
      updateTheme(coords.latitude, coords.longitude);

      setInterval(() => {
        updateTheme(coords.latitude, coords.longitude);
      }, 60000);
    });
  }, []);
};
