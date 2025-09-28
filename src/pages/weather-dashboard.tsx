import WeatherSkelton from "@/components/loading-skleton";
import { Button } from "@/components/ui/button"
import { useGeolocation } from "@/hooks/use-geolocation"
import { RefreshCw } from "lucide-react"

const WeatherDashBoard = () => {

  const {coordinates, error:locationError, getLocation, isLoading:locationLoading} = useGeolocation();

  console.log(coordinates);

  const handleRefresh = () => {
    getLocation();
    if(coordinates) {
      //reload weather data based on new coordinates
    }
  };

  if(locationLoading) {
    return <WeatherSkelton />
  }

  return (
    <div className="space y-4">
      {/*Favorite cities list */}
      <div  className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tightly"> My Location </h1>
          
          <Button variant={'outline'} size={'icon'} className="ml-2" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4"/>
          </Button>
      </div>
    </div>
  )
}

export default WeatherDashBoard