import type {
    WeatherData,
    SimplifiedCurrentWeather,
    SimplifiedDailyForecast,
} from "@/types";

export const fetchWeatherData = async (location: string): Promise<WeatherData> => {
    const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
        location
    )}?unitGroup=us&include=current,days&key=${WEATHER_API_KEY}&contentType=json`;

    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok || data?.error) {
        throw new Error(data?.message || "Failed to fetch weather data.");
    }

    const current: SimplifiedCurrentWeather = {
        datetime: data.currentConditions.datetime,
        temperature: data.currentConditions.temp,
        feelslike: data.currentConditions.feelslike,
        description: data.currentConditions.conditions,
        icon: data.currentConditions.icon,
    };

    const forecast: SimplifiedDailyForecast[] = data.days.map((day: any) => ({
        date: day.datetime,
        tempMin: day.tempmin,
        tempMax: day.tempmax,
        shortDescription: day.conditions,
        longDescription: day.description,
        icon: day.icon,
    }));

    return {
        current,
        forecast,
        location: {
            name: data.resolvedAddress,
        },
    };
};
