import { useState } from "react";
import WeatherSkelton from "@/components/loading-skleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button"
import { useGeolocation } from "@/hooks/use-geolocation"
import { useForecastQuery, useReverseGeocodeQuery, useWeather } from "@/hooks/use-weather";
import { cn } from "@/lib/utils";
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react"


const WeatherDashBoard = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {coordinates, error:locationError, getLocation, isLoading:locationLoading} = useGeolocation();

  const locationQuery = useReverseGeocodeQuery(coordinates);
  const forecasetQuery = useForecastQuery(coordinates);
  const weatherQuery = useWeather(coordinates);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    
    try {
      await getLocation();
      
      if(coordinates) {
        await Promise.all([
          weatherQuery.refetch(),
          forecasetQuery.refetch(),
          locationQuery.refetch(),
        ]);
      }
    } catch (error) {
      console.error("Refresh failed:", error);
    } finally {
      setTimeout(() => {
        setIsRefreshing(false);
      }, 500);
    }
  };

  if(locationLoading) {
    return <WeatherSkelton />
  }

  if(locationError) {
    return (
      <Alert variant={'destructive'}>
        <AlertTriangle className="h-4 w-4"/>
        <AlertTitle> Location Error </AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p> {locationError} </p>
          <Button onClick={getLocation} variant={"outline"} className="w-fit">
            <MapPin className="mr-2 h-4 w-4"/>
            Enable Location
          </Button>
          Your session has been expired. Please refresh and allow location access.
        </AlertDescription>
      </Alert>      
    );
  }

  if(!coordinates) {
    return (
      <Alert variant={'destructive'}>
        <AlertTitle> Location Required</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p> Please enable location access to see your location weather. </p>
          <Button onClick={getLocation} variant={"outline"} className="w-fit">
            <MapPin className="mr-2 h-4 w-4"/>
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>      
    );
  }

  const locationName = locationQuery.data?.[0]?.name ?? "Unknown location";
  const country = locationQuery.data?.[0]?.country ?? "";

  if(weatherQuery.error || forecasetQuery.error) {
    return (
      <Alert variant={'destructive'}>
        <AlertTriangle className="h-4 w-4"/>
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p> Failed to fetch weather data please try again. </p>
          <Button onClick={handleRefresh} variant={"outline"} className="w-fit" disabled={isRefreshing}>
            <RefreshCw className={cn("mr-2 h-4 w-4", isRefreshing && "animate-spin")}/>
            Retry
          </Button>
        </AlertDescription>
      </Alert>   
    );
  }

  if(!weatherQuery.data || !forecasetQuery.data) {
    return <WeatherSkelton />
  }

  return (
    <div className="space-y-4">
      {/*Favorite cities list */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tightly"> My Location </h1>
          
        <Button variant={'outline'} size={'icon'} onClick={handleRefresh} disabled={isRefreshing}>
          <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
        </Button>
      </div>
    </div>
  );
}

export default WeatherDashBoard;