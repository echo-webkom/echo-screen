import { useWeather } from "../hooks/use-weather";

export function Weather() {
    const {data: weather} = useWeather();

    if (!weather) { return <p>Ingen værdata tilgjengelig</p>; }

    if (!weather.temperature) { return <p>Laster værdata...</p>; }
    if (!weather.wind_speed) { return <p>Laster vinddata...</p>; }
    if (!weather.condition) { return <p>Laster skydata...</p>; }

    return (
        <div className="bg-white/30 rounded-md w-1/2 px-4 py-3 space-y-2 border-2">
            <h1 className="font-medium text-lg py-2">Nåværende vær:</h1>
            <p>Temperatur: {weather.temperature}°C</p>
            <p>Værforhold: {weather.condition}</p>
            <p>Vindhastighet: {weather.wind_speed} m/s</p>
        </div>
    );
}