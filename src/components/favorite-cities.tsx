import { useFavorite } from "@/hooks/use-favorite"
import { ScrollArea } from "./ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Loader2, X } from "lucide-react";
import { useWeather } from "@/hooks/use-weather";
import { toast } from "sonner";

interface FavoriteCityTableProps {
    id: string,
    name: string,
    lat: number, 
    lon: number,
    onRemove: (id: string) => void;
}

const FavoriteCities = () => {

    const { favorites, removeFavorite } = useFavorite();

    if(!favorites.length) {
        return null;
    }

    return (
        <>
            <h1 className="text-xl font-bold tracking-tight">Favorites</h1>
            <ScrollArea className="w-full pb-4"> 
                <div className="flex gap-4">
                    {favorites.map((city) => {
                        return (
                            <FavoriteCityTablet 
                                key={city.id} 
                                {...city} 
                                onRemove={() => removeFavorite.mutate(city.id)}
                            />
                        )
                    })}
                </div>
            </ScrollArea>
        </>
    )
}

function FavoriteCityTablet({id, name, lat, lon, onRemove} : FavoriteCityTableProps) {
    const navigate = useNavigate();
    const { data: weather, isLoading } = useWeather({lat, lon});

    return (
        <div 
            onClick={() => navigate(`/city/${name}?lat=${lat}&lon=${lon}`)}
            role="button"
            tabIndex={0}
            className="relative flex min-w-[250px] cursor-pointer items-center gap-3 rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md hover:scale-[1.02]"
        >
            <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1 h-6 w-6 hover:bg-destructive/10 transition-colors"
                onClick={(e) => {
                    e.stopPropagation();
                    onRemove(id);
                    toast.error(`Removed ${name} from Favorites`);
                }}
            >
                <X className="h-4 w-4"/>
            </Button>
            
            {isLoading ? (
                <div className="flex items-center justify-center w-full h-24">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground"/>
                </div>
            ) : weather ? (
                <div className="flex items-center gap-3 w-full pr-6">
                    <img 
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt={weather.weather[0].description}
                        className="w-16 h-16"
                    />
                    <div className="flex flex-col gap-1 flex-1">
                        <p className="font-semibold text-lg">{name}</p>
                        <p className="text-3xl font-bold">{Math.round(weather.main.temp)}°</p>
                        <p className="text-xs text-muted-foreground capitalize leading-tight">
                            {weather.weather[0].description}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center w-full h-24">
                    <p className="text-xs text-muted-foreground">No data</p>
                </div>
            )}
        </div>
    );
}

export default FavoriteCities