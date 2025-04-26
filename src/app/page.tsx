'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/LoadingSpinner';

// Dynamic import WeatherCard to avoid hydration mismatch
const WeatherCard = dynamic(() => import('@/components/WeatherCard'), { ssr: false });

export default function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  interface WeatherData {
    name: string;
    main: { temp: number };
    weather: { description: string; icon: string }[];
  }

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError('Please enter a city name.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setWeather(null);
      } else {
        setWeather(data);
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-sky-200 to-white p-8">
      <h1 className="text-5xl font-bold text-blue-700 mb-8">☀️ Weather Finder</h1>

      <div className="flex w-full max-w-md">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
          className="flex-1 p-3 rounded-l-lg border-t border-b border-l border-gray-300 focus:outline-none text-gray-800"
        />
        <button
          onClick={fetchWeather}
          className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg font-semibold flex items-center justify-center min-w-[100px] h-12 cursor-pointer"
        >
          {loading ? <LoadingSpinner /> : 'Search'}
        </button>
      </div>

      {error && <p className="mt-4 text-red-600 font-semibold">{error}</p>}

      {weather && !error && (
        <div className="mt-10">
          <WeatherCard
            city={weather.name}
            temp={weather.main.temp}
            description={weather.weather[0].description}
            icon={weather.weather[0].icon}
          />
        </div>
      )}
    </main>
  );
}
