export interface SimplifiedCurrentWeather {
    datetime: string;
    temperature: number;
    feelslike: number;
    description: string;
    icon: string;
}

export interface SimplifiedDailyForecast {
    date: string;
    tempMin: number;
    tempMax: number;
    shortDescription: string;
    longDescription: string;
    icon: string;
}

export interface WeatherData {
    current: SimplifiedCurrentWeather;
    forecast: SimplifiedDailyForecast[];
    location: {
        name: string;
    };
}
