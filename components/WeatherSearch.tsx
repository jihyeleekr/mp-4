import React from "react";
import type { SimplifiedCurrentWeather, SimplifiedDailyForecast } from "@/types";

interface WeatherSearchProps {
    current: SimplifiedCurrentWeather;
    forecast: SimplifiedDailyForecast[];
    location: { name: string };
    isNight: boolean;
}

export default function WeatherSearch({
                                          current,
                                          forecast,
                                          location,
                                          isNight,
                                      }: WeatherSearchProps) {
    return (
        <div className="text-left mt-6 w-full max-w-3xl">
            <h3 className="text-xl font-semibold mb-4">
                Current Weather in {location.name}
            </h3>

            <div className="flex items-center gap-4 mb-6">
                <img
                    src={`https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/4th%20Set%20-%20Color/${current.icon}.png`}
                    alt={current.description}
                    className="w-16 h-16"
                />


                <div>
                    <p className="text-xl font-medium">{current.description}</p>
                    <p>Temperature: {current.temperature}°F</p>
                    <p>Feels like: {current.feelslike}°F</p>
                </div>
            </div>

            <h3 className="text-lg font-semibold mb-2">Forecast</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {forecast.slice(0, 7).map((day) => (
                    <div
                        key={day.date}
                        className={`rounded-lg p-4 shadow-sm flex items-center ${
                            isNight
                                ? "bg-gray-100 text-gray-900"
                                : "bg-white text-gray-800"
                        }`}
                    >
                        <img
                            src={`https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/4th%20Set%20-%20Color/${day.icon}.png`}
                            alt={day.shortDescription}
                            className="w-10 h-10 mr-4"
                        />
                        
                        <div>
                            <p className="font-semibold">{day.date}</p>
                            <p className="font-medium">
                                {day.tempMin}°F – {day.tempMax}°F
                            </p>
                            <p className="text-sm font-medium">
                                {day.shortDescription}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
