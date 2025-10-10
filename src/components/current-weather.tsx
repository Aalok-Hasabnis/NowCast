import type { GeocodingResponse, WeatherData } from "@/api/types";
import { Card, CardContent } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";

interface CurrentWeatherProps {
    data: WeatherData,
    locationName?: GeocodingResponse,
}

const CurrentWeather = ({data, locationName} : CurrentWeatherProps) => {
    const {
        weather: [currentWeather],
        main: {temp, feels_like, temp_max, temp_min, humidity},
        wind: {speed},
    } = data;

    const formatTemp = (temp: number) => {
        return `${Math.round(temp)}°`;
    }
    
    return (
        <Card className="overflow-hidden">
            <CardContent className="p-4 sm:p-6">
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Left side - Weather info */}
                    <div className="flex flex-col justify-between space-y-4">
                        {/* Location */}
                        <div className="space-y-2">
                            <div className="flex items-end gap-1">
                                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                                    {locationName?.name}
                                    {locationName?.state && `, ${locationName.state}`}
                                </h2>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {locationName?.country}
                            </p>
                        </div>

                        {/* Temperature */}
                        <div className="flex items-baseline gap-2 sm:gap-4">
                            <p className="text-6xl sm:text-7xl font-bold tracking-tighter">
                                {formatTemp(temp)}
                            </p>
                            <div className="space-y-1">
                                <p className="text-xs sm:text-sm font-medium text-muted-foreground whitespace-nowrap">
                                    Feels like {formatTemp(feels_like)}
                                </p>
                                <div className="flex gap-2 text-sm font-medium">
                                    <span className="flex items-center gap-1 text-blue-500 whitespace-nowrap">
                                        <ArrowDown className="h-3 w-3 flex-shrink-0"/>
                                        {formatTemp(temp_min)}
                                    </span>
                                    <span className="flex items-center gap-1 text-red-500 whitespace-nowrap">
                                        <ArrowUp className="h-3 w-3 flex-shrink-0"/>
                                        {formatTemp(temp_max)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Weather details */}
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                            <div className="flex items-center gap-2 rounded-lg border p-3 hover:bg-accent/50 transition-colors">
                                <Droplets className="h-4 w-4 text-blue-500 flex-shrink-0" />
                                <div className="space-y-0.5 min-w-0">
                                    <p className="text-xs text-muted-foreground">Humidity</p>
                                    <p className="text-sm font-medium">{humidity}%</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 rounded-lg border p-3 hover:bg-accent/50 transition-colors">
                                <Wind className="h-4 w-4 text-blue-500 flex-shrink-0" />
                                <div className="space-y-0.5 min-w-0">
                                    <p className="text-xs text-muted-foreground">Wind Speed</p>
                                    <p className="text-sm font-medium truncate">{speed} m/s</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Weather icon */}
                    <div className="flex flex-col items-center justify-center">
                        <div className="relative flex flex-col items-center">
                            <img 
                                src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
                                alt={currentWeather.description}
                                className="h-[160px] w-[160px] sm:h-[200px] sm:w-[200px] object-contain"
                            />
                            <p className="text-base sm:text-lg font-medium capitalize text-center mt-2">
                                {currentWeather.description}
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default CurrentWeather