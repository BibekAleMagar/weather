import { useLocation } from "react-router-dom";
import type { weatherData } from "../types/type";
import { useForecastByCity } from "../hooks/fiveDayforecast";

function Forecast() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const city = params.get("city") || "";

  const { data, isLoading, error } = useForecastByCity(city, !!city);

  if (!city)
    return (
      <p className="text-white text-center mt-10">
        Please provide a city query parameter
      </p>
    );
  if (isLoading)
    return <p className="text-white text-center mt-10">Loading forecast...</p>;
  if (error)
    return (
      <p className="text-red-500 text-center mt-10">Error loading forecast!</p>
    );

  const daily = data?.list?.filter((_: any, index: number) => index % 8 === 0) ?? [];

  if (daily.length === 0) {
    return (
      <p className="text-white text-center mt-10">No forecast data available</p>
    );
  }

  return (
    <div className="bg-gradient-to-bl from-blue-900 to-blue-400 p-5 min-h-screen flex flex-col justify-center">
      <h2 className="text-white text-3xl font-bold mb-8 text-center">
        5-Day Forecast for {city}
      </h2>
      <div className="grid md:grid-cols-5 grid-cols-2 justify-center gap-4 ">
        {daily.map((entry: weatherData, idx: number) => {
          
          return (
            <div
              key={idx}
              className="bg-white/20  rounded-xl p-4 text-white text-center"
            >
              <p className="font-bold mb-2">
                {new Date(entry.dt_txt).toLocaleDateString()}
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png`}
                alt="weather icon"
                className="mx-auto mb-1 md:w-32 md:h-32"
              />
              <p className=" mb-1 md:text-2xl font-bold">{entry.weather[0].description}</p>
              <p className="md:text-xl font-semibold ">Temp: {entry.main.temp.toFixed(1)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Forecast;
