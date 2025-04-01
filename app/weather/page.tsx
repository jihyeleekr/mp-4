import { Suspense } from "react";
import WeatherContent from "./WeatherContent";

export default function WeatherPage() {
    return (
        <Suspense fallback={<p className="p-6">Loading weather data...</p>}>
            <WeatherContent />
        </Suspense>
    );
}
