import { useQuery } from "@tanstack/react-query";
import { currentLocationWeather } from "../api/weather";

export const useWeatherByCL = (lat: number, lon: number, enabled: boolean) => {
    return useQuery ({
        queryKey: ['weatherByCl',lat, lon],
        queryFn: () => currentLocationWeather(lat, lon) ,
        enabled: enabled,
    })
}