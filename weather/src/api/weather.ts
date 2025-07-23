import axios from "axios";
import type { weatherData } from "../types/type";



export const currentLocationWeather = async (lat: number, lon: number): Promise<weatherData> => {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/weather`, {
        params: {lat, lon, appid: import.meta.env.VITE_API_KEY,}
    })
    console.log(response.data)
    return response.data;
}

export const weatherByCity = async (city: String) => {
    const response = await axios.get<weatherData>(`${import.meta.env.VITE_BASE_URL}/weather`, {
        params: {q:city, appid: import.meta.env.VITE_API_KEY,}
    })
    console.log(response.data)
    return response.data;  
}