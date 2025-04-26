// src/app/api/weather/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getWeather } from '@/lib/getWeather';

export async function GET(req: NextRequest) {
    const city = req.nextUrl.searchParams.get('city');

    if (!city) {
        return NextResponse.json({ error: "City is required" }, { status: 400 });
    }

    try {
        const data = await getWeather(city);
        return NextResponse.json(data);
    } catch {
        return new Response(JSON.stringify({ error: "Failed to fetch weather data" }), { status: 500 });
    }

}

