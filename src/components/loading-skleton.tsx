import { Skeleton } from "./ui/skeleton";
import { Card, CardContent, CardHeader } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

interface WeatherSkeltonProps {
    favoritesCount?: number;
}

function WeatherSkelton({ favoritesCount = 0 }: WeatherSkeltonProps) {
    return (
        <div className="space-y-6">
            {/* Favorites Skeleton - only show if there are favorites */}
            {favoritesCount > 0 && (
                <div className="space-y-4">
                    <Skeleton className="h-6 w-24"/>
                    <ScrollArea className="w-full pb-4">
                        <div className="flex gap-4">
                            {[...Array(favoritesCount)].map((_, i) => (
                                <div 
                                    key={i}
                                    className="relative flex min-w-[250px] items-center gap-3 rounded-lg border bg-card p-4 shadow-sm"
                                >
                                    <Skeleton className="h-6 w-6 rounded absolute right-1 top-1"/>
                                    <div className="flex items-center gap-3 w-full pr-6">
                                        <Skeleton className="w-16 h-16 rounded"/>
                                        <div className="flex flex-col gap-2 flex-1">
                                            <Skeleton className="h-5 w-24"/>
                                            <Skeleton className="h-8 w-16"/>
                                            <Skeleton className="h-3 w-32"/>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            )}

            {/* Header Skeleton */}
            <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-32"/>
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