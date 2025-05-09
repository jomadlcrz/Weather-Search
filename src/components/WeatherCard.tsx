// src/components/WeatherCard.tsx
import Image from 'next/image';

type WeatherProps = {
    city: string;
    temp: number;
    description: string;
    icon: string;
};

export default function WeatherCard({ city, temp, description, icon }: WeatherProps) {
    return (
        <div className="p-6 bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-2xl shadow-2xl max-w-sm w-full">
            <div className="flex flex-col items-center">
                <Image
                    src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                    alt={description}
                    width={100}
                    height={100}
                    priority
                />
                <h2 className="text-3xl font-bold mt-2">{city}</h2>
                <p className="text-5xl mt-2">{temp}°C</p>
                <p className="capitalize text-lg mt-1">{description}</p>
            </div>
        </div>
    );
}
