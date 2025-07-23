import { useQuery } from "@tanstack/react-query";
import { forecastByCity } from '../api/fiveDayApi'
import type { fiveDayForecastResponse } from "../types/fiveDatyType";

export const useForecastByCity = (city: string, enabled: boolean) => {
  return useQuery<fiveDayForecastResponse>({
    queryKey: ["forecast", city],
    queryFn: () => forecastByCity(city),
    enabled: enabled,
    staleTime: 1000 * 60 * 10, 
    retry: 1
  });
};
