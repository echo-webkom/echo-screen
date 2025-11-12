import { useWeather } from "../hooks/use-weather";
import { TiWeatherDownpour, TiWeatherCloudy, TiWeatherSnow, TiWeatherSunny, TiWeatherWindy } from "react-icons/ti";
import { FaTemperatureLow } from "react-icons/fa";
import { FaTemperatureHalf, FaTemperatureFull } from "react-icons/fa6";

export function Weather() {
    const {data: weather} = useWeather();

    if (!weather) { return <p>Ingen værdata tilgjengelig</p>; }

    if (!weather.temperature) { return <p>Laster værdata...</p>; }
    if (!weather.wind_speed) { return <p>Laster vinddata...</p>; }
    if (!weather.condition) { return <p>Laster skydata...</p>; }

    let WeatherIcon;
    let cond;
    switch (weather.condition) {
        case "rainy":
            WeatherIcon = TiWeatherDownpour;
            cond = "regn"
            break;
        case "cloudy":
            WeatherIcon = TiWeatherCloudy;
            cond = "skyet"
            break;
        case "snowy":
            WeatherIcon = TiWeatherSnow;
            cond = "snø"
            break;
        case "sunny":
            WeatherIcon = TiWeatherSunny;
            cond = "sol"
            break;
        default:
            WeatherIcon = null;
            cond = null;
    }

    let TemperatureIcon;
    const temp = parseFloat(weather.temperature);
    if (temp <= 0) {
        TemperatureIcon = FaTemperatureLow;
    }
    else if (temp > 0 && temp < 15) {
        TemperatureIcon = FaTemperatureHalf;
    }
    else if (temp >= 15) {
        TemperatureIcon = FaTemperatureFull;
    } else {
        TemperatureIcon = null;
    }

    return (
        <div className="flex items-center gap-4 text-md text-gray-700">
            <div className="flex items-center gap-1">
                <span>{weather.temperature}°C</span>
                {TemperatureIcon && <TemperatureIcon className="text-md opacity-80" />}
            </div>

            <div className="flex items-center gap-1">
                <span>{cond}</span>
                {WeatherIcon && <WeatherIcon className="text-md opacity-80" />}
            </div>

            <div className="flex items-center gap-1">
                <span>{weather.wind_speed} m/s</span>
                <TiWeatherWindy className="text-md opacity-80" />
            </div>
        </div>
    );

}