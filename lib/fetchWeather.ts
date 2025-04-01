import type {
    WeatherData,
    SimplifiedCurrentWeather,
    SimplifiedDailyForecast,
} from "@/types";

// Inline type for day item from Visual Crossing API
interface RawForecastDay {
    datetime: string;
    tempmin: number;
    tempmax: number;
    conditions: string;
    description: string;
    icon: string;
}

export const fetchWeatherData = async (location: string): Promise<WeatherData> => {
    const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

    if (!WEATHER_API_KEY) {
        throw new Error("Missing API key");
    }

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
        location
    )}?unitGroup=us&include=current,days&key=${WEATHER_API_KEY}&contentType=json`;

    const res = await fetch(url);

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Fetch failed: ${res.status} ${res.statusText}\n${errorText}`);
    }

    let data: {
        currentConditions: {
            datetime: string;
            temp: number;
            feelslike: number;
            conditions: string;
            icon: string;
        };
        days: RawForecastDay[];
        resolvedAddress: string;
    };

    try {
        data = await res.json();
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error("Failed to parse weather data: " + err.message);
        }
        throw new Error("Unknown error while parsing weather data.");
    }

    const current: SimplifiedCurrentWeather = {
        datetime: data.currentConditions.datetime,
        temperature: data.currentConditions.temp,
        feelslike: data.currentConditions.feelslike,
        description: data.currentConditions.conditions,
        icon: data.currentConditions.icon,
    };

    const forecast: SimplifiedDailyForecast[] = data.days.map((day: RawForecastDay) => ({
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
