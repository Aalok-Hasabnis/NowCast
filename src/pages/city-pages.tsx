import CurrentWeather from "@/components/current-weather";
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
      <Alert variant="destructive">
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
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{params.cityName}, {weatherQuery.data.sys.country}</h1>
          <div>
            {/* Favoriate button */}
          </div>
      </div>

      <div className="space-y-6">
        {/* Current Weather & Hourly Temperature */}
        <div className="grid gap-6">
          <div className="flex flex-col gap-4">
            <CurrentWeather data={weatherQuery.data}/>
            <HourlyTemprature data={forecasetQuery.data}/>
          </div>
        </div>

        {/* Weather Details & Forecast */}
        <div className="grid gap-6 md:grid-cols-2">
          <WeatherDetails data={weatherQuery.data}/>
          <WeatherForecast data={forecasetQuery.data}/>
        </div>
      </div>
    </div>
  )
}

export default CityPage