"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchWeatherData } from "@/lib/fetchWeather";
import WeatherSearch from "@/components/WeatherSearch";
import type { SimplifiedCurrentWeather, SimplifiedDailyForecast } from "@/types";

function getWeatherBackground(icon: string): string {
    const lowerIcon = icon.toLowerCase();

    if (lowerIcon.includes("night") || lowerIcon.includes("moon")) {
        return "from-gray-800 to-gray-700";
    }
    if (lowerIcon.includes("clear")) return "from-yellow-100 to-white";
    if (lowerIcon.includes("partly-cloudy")) return "from-sky-100 to-white";
    if (lowerIcon.includes("cloud") || lowerIcon.includes("overcast")) return "from-gray-200 to-white";
    if (lowerIcon.includes("rain") || lowerIcon.includes("drizzle")) return "from-blue-300 to-white";
    if (lowerIcon.includes("snow")) return "from-indigo-100 to-white";
    if (lowerIcon.includes("fog") || lowerIcon.includes("mist")) return "from-gray-300 to-gray-100";

    return "from-sky-100 to-white";
}

export default function WeatherPage() {
    const searchParams = useSearchParams();
    const city = searchParams.get("city");

    const [current, setCurrent] = useState<SimplifiedCurrentWeather | null>(null);
    const [forecast, setForecast] = useState<SimplifiedDailyForecast[]>([]);
    const [locationInfo, setLocationInfo] = useState<{ name: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!city) return;

        const getData = async () => {
            setLoading(true);
            try {
                const { current, forecast, location } = await fetchWeatherData(city);
                setCurrent(current);
                setForecast(forecast);
                setLocationInfo(location);
            } catch (err: unknown) {
                if (err instanceof Error) setError(err.message);
                else setError("Failed to fetch weather data.");
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, [city]);

    const bgGradient = getWeatherBackground(current?.icon || "");
    const isNight = current?.icon?.toLowerCase().includes("night") === true;

    return (
        <div
            className={`min-h-screen bg-gradient-to-b ${bgGradient} ${
                isNight ? "text-white" : "text-black"
            } flex flex-col items-center p-6 transition-all duration-300`}
        >
            <h1 className="text-3xl font-bold mb-6">Weather Forecast</h1>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {current && forecast.length > 0 && locationInfo && (
                <WeatherSearch
                    current={current}
                    forecast={forecast}
                    location={locationInfo}
                    isNight={isNight}
                />
            )}
        </div>
    );
}
