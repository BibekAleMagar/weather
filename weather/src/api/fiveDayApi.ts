import type {fiveDayForecastResponse } from "../types/fiveDatyType";
import axios from "axios";
export const forecastByCity = async (city: string) => {
  const response = await axios.get<fiveDayForecastResponse>(`${import.meta.env.VITE_BASE_URL}/forecast`, {
    params: {
      q: city,
      appid: import.meta.env.VITE_API_KEY,
      units: "metric",
    },
  });

  return response.data;
};