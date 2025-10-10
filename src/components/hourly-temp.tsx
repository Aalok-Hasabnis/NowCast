import type { ForecastData } from "@/api/types"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { format } from "date-fns"

interface HourlyTempratureProps {
    data: ForecastData,
}

const HourlyTemprature = ({data}: HourlyTempratureProps) => {

    const chartData = data.list.slice(0, 8).map(item => ({
        time: format(new Date(item.dt * 1000), 'ha'),
        temp: Math.round(item.main.temp),
        feels_like: Math.round(item.main.feels_like),
    }));
      

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Today's Temperature</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] sm:h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={chartData} 
              margin={{ 
                top: 5, 
                right: 10, 
                left: -10, 
                bottom: 5 
              }}
            > 
              <XAxis 
                dataKey="time" 
                stroke="#888888" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
                dy={10}
              />
              <YAxis 
                stroke="#888888" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(value) => `${value}°`}
                dx={-5}
              />

              <Tooltip 
                content={({active, payload}) => {
                  if(active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-md">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex flex-col"> 
                            <span className="text-[0.70rem] uppercase text-muted-foreground font-medium">
                              Temperature
                            </span>
                            <span className="font-bold text-lg">{payload[0].value}°</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground font-medium">
                              Feels like
                            </span>
                            <span className="font-bold text-lg">{payload[1].value}°</span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Line 
                type="monotone" 
                dataKey="temp" 
                stroke="#4f46e5" 
                strokeWidth={2} 
                dot={false}
                activeDot={{ r: 4, strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="feels_like" 
                stroke="#64748b" 
                strokeWidth={2} 
                dot={false} 
                strokeDasharray="5 5"
                activeDot={{ r: 4, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex items-center justify-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#4f46e5]" />
            <span className="text-muted-foreground">Temperature</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#64748b] opacity-70" />
            <span className="text-muted-foreground">Feels like</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default HourlyTemprature