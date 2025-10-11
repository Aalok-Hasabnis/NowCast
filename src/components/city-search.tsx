import { CommandGroup, CommandItem } from "cmdk"
import { Button } from "./ui/button"
import { CommandDialog, CommandEmpty, CommandInput, CommandList, CommandSeparator } from "./ui/command"
import { use, useState } from "react"
import { Clock, Loader2, Search, XCircle } from "lucide-react"
import { useSearchLocations } from "@/hooks/use-weather"
import { useNavigate } from "react-router-dom"
import { useSearchHistory } from "@/hooks/use-search-history"
import { format } from "date-fns"

const CitySearch = () => {
  
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const {data: locations, isLoading } = useSearchLocations(query);
    const {history, clearHistory, addToHistory} = useSearchHistory();

    const handleSelect = (cityData: string) => {
        const [lat, lon, name, country] = cityData.split("|");

        // Add seacrh history logic here
        addToHistory.mutate({
            query, 
            name,
            lat: parseFloat(lat), 
            lon: parseFloat(lon),
            country,
        });
        
        setOpen(false);
        navigate(`/city/${name}??lat=${lat}&lon=${lon}`);
    };

    return (
    <>
    <Button 
        className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        variant={"outline"}
        onClick={() => setOpen(true)}> 
        <Search className="mr-2 h-4 w-4"/>
        Search Cities...
    </Button>

    <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
        placeholder="Search for cities..." 
        value={query}
        onValueChange={setQuery}/>
        <CommandList>
            {query.length > 2 && !isLoading && (
                <CommandEmpty>No Cities Found.</CommandEmpty>
        )}

            {history.length > 0 && (
            <>
                <CommandGroup>
                    <div className="flex items-center justify-between px-2 py-1.5">
                        <p className="text-xs font-medium text-muted-foreground">Recent Searches</p>
                        <Button 
                            variant="ghost"
                            size="sm"
                            onClick={() => clearHistory.mutate()}
                            className="h-auto p-1 hover:bg-transparent hover:text-destructive"
                        >
                            <XCircle className="h-3.5 w-3.5"/>
                            <span className="ml-1 text-xs">Clear</span>
                        </Button>
                    </div>

                    {history.map((location) => {
                        return (
                            <CommandItem 
                                key={location.id}
                                value={`${location.lat}| ${location.lon}| ${location.name}| ${location.country}`}
                                onSelect={handleSelect}
                                className="flex items-center justify-between cursor-pointer"
                            >
                                <div className="flex items-center min-w-0 flex-1">
                                    <Clock className="mr-2 h-4 w-4 flex-shrink-0 text-muted-foreground"/>
                                    <div className="flex items-center flex-wrap gap-x-1 min-w-0">
                                        <span className="font-medium">{location.name}</span>
                                        {location.state && (
                                            <span className="text-sm text-muted-foreground">, {location.state}</span>
                                        )}
                                        <span className="text-sm text-muted-foreground">, {location.country}</span>
                                    </div>
                                </div>
                                <span className="ml-2 text-xs text-muted-foreground flex-shrink-0">
                                    {format(location.searchedAt, "MMM d, h:mm a")}
                                </span>
                            </CommandItem>
                        );
                    })}
                </CommandGroup>
                <CommandSeparator />
            </>
            )}
            
            {locations && locations.length > 0 && (
            <CommandGroup heading="Suggestions">
                {isLoading && (
                    <div className="flex items-center justify-center p-4">
                        <Loader2 className="h-4 w-4 animate-spin"/>
                    </div>
                )}
                {locations.map((location) => {
                    return (
                        <CommandItem 
                    key={`${location.lat}-${location.lon}`}
                    value={`${location.lat}| ${location.lon}| ${location.name}| ${location.country}`}
                    onSelect={handleSelect}
                    className="flex items-center cursor-pointer"
                >
                    <Search className="mr-2 h-4 w-4 flex-shrink-0"/>
                    <div className="flex items-center flex-wrap gap-x-1">
                        <span className="font-medium">{location.name}</span>
                        {location.state && (
                            <span className="text-sm text-muted-foreground">, {location.state}</span>
                        )}
                        <span className="text-sm text-muted-foreground">, {location.country}</span>
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