import type { weatherData } from "./type";


export interface fiveDayForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: weatherData[];
  city: {
    id: number;
    name: string;
    country: string;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}


