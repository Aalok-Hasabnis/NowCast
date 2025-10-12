import { CommandGroup, CommandItem } from "cmdk"
import { Button } from "./ui/button"
import { CommandDialog, CommandEmpty, CommandInput, CommandList, CommandSeparator } from "./ui/command"
import { useState } from "react"
import { Clock, Loader2, Search, Star, XCircle } from "lucide-react"
import { useSearchLocations } from "@/hooks/use-weather"
import { useNavigate } from "react-router-dom"
import { useSearchHistory } from "@/hooks/use-search-history"
import { useFavorite } from "@/hooks/use-favorite"
import { format } from "date-fns"

const CitySearch = () => {
  
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const {data: locations, isLoading } = useSearchLocations(query);
    const {history, clearHistory, addToHistory} = useSearchHistory();
    const {favorites} = useFavorite();

    const handleSelect = (cityData: string) => {
        const [lat, lon, name, country] = cityData.split("|");

        addToHistory.mutate({
            query, 
            name,
            lat: parseFloat(lat), 
            lon: parseFloat(lon),
            country,
        });
        
        setOpen(false);
        setQuery("");
        navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
    };

    return (
    <>
    <Button 
        className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64 hover:bg-accent transition-colors"
        variant={"outline"}
        onClick={() => setOpen(true)}> 
        <Search className="mr-2 h-4 w-4"/>
        Search Cities...
    </Button>

    <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
            placeholder="Search for cities..." 
            value={query}
            onValueChange={setQuery}
        />
        <CommandList>
            {query.length > 2 && !isLoading && locations?.length === 0 && (
                <CommandEmpty>No Cities Found.</CommandEmpty>
            )}

            {!query && favorites.length > 0 && (
            <>
                <CommandGroup heading="Favorites">
                    {favorites.map((location) => {
                        return (
                            <CommandItem 
                                key={location.id}
                                value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                                onSelect={handleSelect}
                                className="flex items-center gap-3 cursor-pointer py-3 hover:bg-accent/50 transition-colors"
                            >
                                <Star className="h-4 w-4 flex-shrink-0 text-yellow-500 stroke-2"/>
                                <div className="flex items-center flex-wrap gap-x-1.5 min-w-0 flex-1">
                                    <span className="font-semibold">{location.name}</span>
                                    {location.state && (
                                        <span className="text-sm text-muted-foreground">• {location.state}</span>
                                    )}
                                    <span className="text-sm text-muted-foreground">• {location.country}</span>
                                </div>
                            </CommandItem>
                        );
                    })}
                </CommandGroup>
                <CommandSeparator className="my-2"/>
            </>
            )}

            {!query && history.length > 0 && (
            <>
                <CommandGroup>
                    <div className="flex items-center justify-between px-2 py-2">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Recent Searches</p>
                        <Button 
                            variant="ghost"
                            size="sm"
                            onClick={() => clearHistory.mutate()}
                            className="h-auto px-2 py-1 hover:bg-destructive/10 hover:text-destructive transition-colors"
                        >
                            <XCircle className="h-3.5 w-3.5"/>
                            <span className="ml-1.5 text-xs font-medium">Clear</span>
                        </Button>
                    </div>

                    {history.map((location) => {
                        return (
                            <CommandItem 
                                key={location.id}
                                value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                                onSelect={handleSelect}
                                className="flex items-center justify-between cursor-pointer py-3 hover:bg-accent/50 transition-colors"
                            >
                                <div className="flex items-center gap-3 min-w-0 flex-1">
                                    <Clock className="h-4 w-4 flex-shrink-0 text-muted-foreground"/>
                                    <div className="flex items-center flex-wrap gap-x-1.5 min-w-0">
                                        <span className="font-semibold">{location.name}</span>
                                        {location.state && (
                                            <span className="text-sm text-muted-foreground">• {location.state}</span>
                                        )}
                                        <span className="text-sm text-muted-foreground">• {location.country}</span>
                                    </div>
                                </div>
                                <span className="ml-3 text-xs text-muted-foreground flex-shrink-0 font-medium">
                                    {format(location.searchedAt, "MMM d, h:mm a")}
                                </span>
                            </CommandItem>
                        );
                    })}
                </CommandGroup>
                <CommandSeparator className="my-2"/>
            </>
            )}
            
            {isLoading && query.length > 2 && (
                <div className="flex items-center justify-center p-8">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground"/>
                </div>
            )}

            {locations && locations.length > 0 && (
            <CommandGroup heading="Suggestions">
                {locations.map((location) => {
                    return (
                        <CommandItem 
                            key={`${location.lat}-${location.lon}`}
                            value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                            onSelect={handleSelect}
                            className="flex items-center gap-3 cursor-pointer py-3 hover:bg-accent/50 transition-colors"
                        >
                            <Search className="h-4 w-4 flex-shrink-0 text-muted-foreground"/>
                            <div className="flex items-center flex-wrap gap-x-1.5">
                                <span className="font-semibold">{location.name}</span>
                                {location.state && (
                                    <span className="text-sm text-muted-foreground">• {location.state}</span>
                                )}
                                <span className="text-sm text-muted-foreground">• {location.country}</span>
                            </div>
                        </CommandItem>
                    );
                })}
            </CommandGroup>
            )}
        </CommandList>
    </CommandDialog>
    </>
  );
}

export default CitySearch