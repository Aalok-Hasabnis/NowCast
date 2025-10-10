import { Skeleton } from "./ui/skeleton";
import { Card, CardContent, CardHeader } from "./ui/card";

function WeatherSkelton() {
    return (
        <div className="space-y-4">
            {/* Header Skeleton */}
            <div className="flex items-center justify-between">
                <Skeleton className="h-7 w-32"/>
                <Skeleton className="h-10 w-10 rounded-md"/>
            </div>

            <div className="space-y-6">
                {/* Current Weather & Hourly Skeleton */}
                <div className="grid gap-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Current Weather Skeleton */}
                        <Card className="flex-1 overflow-hidden">
                            <CardContent className="p-6">
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Skeleton className="h-7 w-40"/>
                                            <Skeleton className="h-4 w-24"/>
                                        </div>
                                        <div className="flex items-baseline gap-4">
                                            <Skeleton className="h-20 w-20"/>
                                            <div className="space-y-2">
                                                <Skeleton className="h-4 w-32"/>
                                                <Skeleton className="h-4 w-28"/>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <Skeleton className="h-16 w-full rounded-lg"/>
                                            <Skeleton className="h-16 w-full rounded-lg"/>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <Skeleton className="h-40 w-40 rounded-full"/>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Hourly Temperature Skeleton */}
                        <Card className="flex-1">
                            <CardHeader>
                                <Skeleton className="h-6 w-36"/>
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-[200px] sm:h-[240px] w-full rounded-lg"/>
                                <div className="flex items-center justify-center gap-6 mt-4">
                                    <Skeleton className="h-4 w-24"/>
                                    <Skeleton className="h-4 w-24"/>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Weather Details & Forecast Skeleton */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Weather Details Skeleton */}
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-32"/>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                                {[...Array(4)].map((_, i) => (
                                    <Skeleton key={i} className="h-20 w-full rounded-lg"/>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Forecast Skeleton */}
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-28"/>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {[...Array(6)].map((_, i) => (
                                    <Skeleton key={i} className="h-20 w-full rounded-lg"/>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default WeatherSkelton;