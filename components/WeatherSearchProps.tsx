import type { SimplifiedCurrentWeather, SimplifiedDailyForecast } from "@/types";

export interface WeatherSearchProps {
    current: SimplifiedCurrentWeather;
    forecast: SimplifiedDailyForecast[];
    location: {
        name: string;
    };
    isNight: boolean;
}
