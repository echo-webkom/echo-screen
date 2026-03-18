import { useEffect } from "react";
import SunCalc from "suncalc";

export const useSunDarkMode = () => {
  useEffect(() => {
    const updateTheme = () => {
      const lat = 60.39299;
      const lon = 5.32415;

      const now = new Date();
      const times = SunCalc.getTimes(now, lat, lon);

      const shouldBeDark = now > times.sunset || now < times.sunrise;
      document.documentElement.classList.toggle("dark", shouldBeDark);
    };

    updateTheme();

    setInterval(() => {
      updateTheme();
    }, 60000);
  }, []);
};
