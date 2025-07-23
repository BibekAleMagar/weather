import { useQuery } from "@tanstack/react-query";
import { weatherByCity } from "../api/weather";


export const useWeatherByCity = (city: String, enabled: boolean) => {
    return  useQuery({
        queryKey: ['weatherByCity', city],
        queryFn: () => weatherByCity(city),
        enabled: enabled && !!city,
    });
}