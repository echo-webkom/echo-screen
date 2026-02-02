import { useWeather } from "../hooks/use-weather";
import {
  TiWeatherDownpour,
  TiWeatherCloudy,
  TiWeatherSnow,
  TiWeatherSunny,
  TiWeatherWindy
} from "react-icons/ti";
import { FaTemperatureLow } from "react-icons/fa";
import { FaTemperatureHalf, FaTemperatureFull } from "react-icons/fa6";

export function Weather() {
  const { data: weather } = useWeather();

  if (!weather?.temperature) {
    return null;
  }

  const { WeatherIcon, norCond } = getIconForCondition(weather.condition);
  const { TempIcon, temp } = getTempIcon(weather.temperature);

  return (
    <div className="flex items-center gap-x-4 text-sm text-gray-700">
      <div className="flex items-center gap-1">
        {TempIcon && <TempIcon className="text-md opacity-80" />}
        <span>{temp}°C</span>
      </div>

      <div className="flex items-center gap-1">
        {WeatherIcon && <WeatherIcon className="text-md opacity-80" />}
        {norCond && <span>{norCond}</span>}
      </div>

      <div className="flex items-center gap-1">
        <TiWeatherWindy className="text-md opacity-80" />
        <span>{weather.wind_speed} m/s</span>
      </div>
    </div>
  );
}

function getTempIcon(temperature: string) {
  let TempIcon;
  const temp = parseFloat(temperature);

  if (temp <= 0) {
    TempIcon = FaTemperatureLow;
  } else if (temp > 0 && temp < 15) {
    TempIcon = FaTemperatureHalf;
  } else {
    TempIcon = FaTemperatureFull;
  }

  return { TempIcon, temp };
}

function getIconForCondition(condition: string) {
  let WeatherIcon;
  let norCond;
  switch (condition) {
    case "rainy":
      WeatherIcon = TiWeatherDownpour;
      norCond = "Regn";
      break;
    case "cloudy":
      WeatherIcon = TiWeatherCloudy;
      norCond = "Skyet";
      break;
    case "snowy":
      WeatherIcon = TiWeatherSnow;
      norCond = "Snø";
      break;
    case "sunny":
      WeatherIcon = TiWeatherSunny;
      norCond = "Sol";
      break;
    default:
      WeatherIcon = null;
      norCond = null;
  }
  return { WeatherIcon, norCond };
}
