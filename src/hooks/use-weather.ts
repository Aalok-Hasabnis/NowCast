import type { Coordinates } from "@/api/types";
import { weatherAPI } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";

export const WEATHER_KEY = {
    weather:(coords: Coordinates) => ["weather", coords] as const,
    forecast:(coords: Coordinates) => ["forecast", coords] as const,
    location:(coords: Coordinates) => ["reverse-geocode", coords] as const,
    search:(query: string) => ["location-search", query] as const,
} as const;

export function useWeather(coordinates: Coordinates | null) {
    return useQuery({
        queryKey: WEATHER_KEY.weather(coordinates ?? ({ lat: 0, lon: 0 })),
        queryFn: () => coordinates ? weatherAPI.getCurrentWeather(coordinates) : null,
        enabled: !!coordinates,
        retry: 1,
        refetchOnWindowFocus: false,
    });
}

export function useForecastQuery(coordinates: Coordinates | null) {
    return useQuery({
        queryKey: WEATHER_KEY.forecast(coordinates ?? ({ lat: 0, lon: 0 })),
        queryFn: () => coordinates ? weatherAPI.getForecast(coordinates) : null,
        enabled: !!coordinates,
        retry: 1,
        refetchOnWindowFocus: false,
    });
}

export function useReverseGeocodeQuery(coordinates: Coordinates | null) {
    return useQuery({
        queryKey: WEATHER_KEY.location(coordinates ?? ({ lat: 0, lon: 0 })),
        queryFn: () => coordinates ? weatherAPI.reverseGeocode(coordinates) : null,
        enabled: !!coordinates,
        retry: 1,
        refetchOnWindowFocus: false,
    });
}

export function useSearchLocations(query: string) {
    return useQuery({
        queryKey: WEATHER_KEY.search(query),
        queryFn: () => weatherAPI.searchLocations(query),
        enabled: query.length > 2,
    });
}