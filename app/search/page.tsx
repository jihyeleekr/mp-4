"use client";
import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

export default function SearchPage() {
    const [locationInput, setLocationInput] = useState("");
    const router = useRouter();

    const changeLocation = (event: ChangeEvent<HTMLInputElement>) => {
        setLocationInput(event.target.value);
    };

    const handleSearch = () => {
        if (!locationInput.trim()) return;
        router.push(`/weather?city=${encodeURIComponent(locationInput.trim())}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white flex flex-col items-center">
            <h1 className="text-3xl font-bold mt-6 text-sky-700">Search for Weather</h1>

            <div className="mt-16 bg-white rounded-lg shadow-lg p-8 w-[300px] sm:w-[400px] text-center">
                <h2 className="text-2xl font-bold mb-2 text-gray-800">Check the Forecast</h2>
                <p className="text-gray-500 text-sm mb-6">Enter a city name below</p>

                <label htmlFor="city" className="block text-left font-medium mb-1 text-gray-700">
                    City Name
                </label>
                <input
                    id="city"
                    type="text"
                    value={locationInput}
                    onChange={changeLocation}
                    placeholder="Boston"
                    className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-sky-400"
                />

                <button
                    onClick={handleSearch}
                    className="w-full bg-sky-500 text-white py-2 rounded hover:bg-sky-600 transition"
                >
                    Get Weather
                </button>
            </div>
        </div>

    );
}
