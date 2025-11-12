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

  if (!weather) {
    return <p>Ingen værdata tilgjengelig</p>;
  }

  if (!weather.temperature) {
    return <p>Laster værdata...</p>;
  }
  if (!weather.wind_speed) {
    return <p>Laster vinddata...</p>;
  }
  if (!weather.condition) {
    return <p>Laster skydata...</p>;
  }

  const { WeatherIcon, norCond } = getIconForCondition(weather.condition);
  const { TempIcon, temp } = getTempIcon(weather.temperature);

  return (
    <div className="flex items-center gap-4 text-md text-gray-700">
      <div className="flex items-center gap-1">
        <span>{temp}°C</span>
        {TempIcon && <TempIcon className="text-md opacity-80" />}
      </div>

      <div className="flex items-center gap-1">
        <span>{norCond}</span>
        {WeatherIcon && <WeatherIcon className="text-md opacity-80" />}
      </div>

      <div className="flex items-center gap-1">
        <span>{weather.wind_speed} m/s</span>
        <TiWeatherWindy className="text-md opacity-80" />
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
  } else if (temp >= 15) {
    TempIcon = FaTemperatureFull;
  } else {
    TempIcon = null;
  }
  return { TempIcon, temp };
}

function getIconForCondition(condition: string) {
  let WeatherIcon;
  let norCond;
  switch (condition) {
    case "rainy":
      WeatherIcon = TiWeatherDownpour;
      norCond = "regn";
      break;
    case "cloudy":
      WeatherIcon = TiWeatherCloudy;
      norCond = "skyet";
      break;
    case "snowy":
      WeatherIcon = TiWeatherSnow;
      norCond = "snø";
      break;
    case "sunny":
      WeatherIcon = TiWeatherSunny;
      norCond = "sol";
      break;
    default:
      WeatherIcon = null;
      norCond = null;
  }
  return { WeatherIcon, norCond };
}
