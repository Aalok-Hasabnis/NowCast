import CurrentWeather from "@/components/current-weather";
import FavoriteButton from "@/components/favorite-button";
import HourlyTemprature from "@/components/hourly-temp";
import WeatherSkelton from "@/components/loading-skleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import WeatherDetails from "@/components/weather-details";
import WeatherForecast from "@/components/weather-forecase";
import { useForecastQuery, useWeather } from "@/hooks/use-weather";
import { AlertTriangle } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom"

const CityPage = () => {

  const [ searchParams ] = useSearchParams();
  const params = useParams();
  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");

  const coordinates = {lat, lon}; 
  const forecasetQuery = useForecastQuery(coordinates);
  const weatherQuery = useWeather(coordinates);

  if(weatherQuery.error || forecasetQuery.error) {
    return (
      <Alert variant="destructive" className="animate-in fade-in-50 slide-in-from-top-2 duration-500">
        <AlertTriangle className="h-4 w-4"/>
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Failed to fetch weather data. Please try again.</p>
        </AlertDescription>
      </Alert>   
    );
  }

  if(!weatherQuery.data || !forecasetQuery.data || !params.cityName) {
    return <WeatherSkelton/>
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-700">
      <div className="flex items-center justify-between bg-gradient-to-r from-background to-muted/20 p-6 rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.01]">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            {params.cityName}
          </h1>
          <p className="text-sm text-muted-foreground font-medium">{weatherQuery.data.sys.country}</p>
        </div>
        <div className="transform transition-transform duration-200 hover:scale-110 active:scale-95">
          <FavoriteButton data={{...weatherQuery.data, name:params.cityName}} />
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid gap-6">
          <div className="flex flex-col gap-6">
            <div className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
              <CurrentWeather data={weatherQuery.data}/>
            </div>
            <div className="transform transition-all duration-300 hover:shadow-md rounded-xl">
              <HourlyTemprature data={forecasetQuery.data}/>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:-translate-y-1">
            <WeatherDetails data={weatherQuery.data}/>
          </div>
          <div className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:-translate-y-1">
            <WeatherForecast data={forecasetQuery.data}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CityPage