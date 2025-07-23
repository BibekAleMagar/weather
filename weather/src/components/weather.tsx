import { useEffect, useState } from "react";
import { useWeatherByCity } from "../hooks/weatherByCity";
import { useWeatherByCL } from "../hooks/weatherByCL";
import { FaSearch } from "react-icons/fa";
import WeatherInfoBox from "./diplsyByInfor";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

function Weather() {
  const [coord, setCoord] = useState<{ lat: number; lon: number } | null>(null);
  const [city, setCity] = useState("");
  const [searchCity, setSearchCity] = useState("kathmandu");
  const [celsius, setCelsius] = useState<number | null>(null);
  const [fahrenheit, setFahrenheit] = useState<number | null>(null);
  const [active, setActive] = useState("c");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [day, setDay] = useState("");


  const navigate = useNavigate();
  useEffect(() => {
    if (!coord) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoord({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error(error.message);
        }
      );
    }
  }, [coord]);

  const {
    data: locationWeather,
    isLoading: loadingCoord,
    error: coordError,
  } = useWeatherByCL(coord?.lat ?? 0, coord?.lon ?? 0, !!coord);

  const {
    data: cityWeather,
    isLoading: loadingCity,
    error: cityError,
  } = useWeatherByCity(searchCity, !!searchCity);

  const displayData = searchCity ? cityWeather : locationWeather;
  const isLoading = searchCity ? loadingCity : loadingCoord;
  const error = cityError ? cityError : coordError;
  useEffect(() => {
    if (displayData?.main?.temp) {
      const kelvin = displayData.main.temp;
      const c = kelvin - 273.15;
      const f = (kelvin - 273.15) * (9 / 5) + 32;
      setCelsius(parseFloat(c.toFixed(2)));
      setFahrenheit(parseFloat(f.toFixed(2)));
    }
    if (displayData?.dt) {
      const dateObj = new Date(displayData.dt * 1000);
      setDate(dateObj.toLocaleDateString());
      setTime(dateObj.toLocaleTimeString());
      setDay(dateObj.toLocaleDateString("en-US", { weekday: "long" }));
    }
  }, [displayData]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSearchCity(city);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-bl from-blue-900 to-blue-400 p-5 flex justify-center items-center">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <FaSpinner  className="text-4xl animate-spin"/>

        </div>
      ): error? (
        <div>
          <p>Something went wrong</p>
        </div>
      ):(
        <div className="w-full md:max-w-3xl shadow-2xl bg-blue-900/25 p-5 rounded-2xl ">
        <form
          onSubmit={handleSubmit}
          className="flex md:flex-row justify-between items-center gap-4 mb-6"
        >
          <input
            type="text"
            value={city}
            placeholder="Enter the city name"
            onChange={(e) => setCity(e.target.value)}
            className="rounded-xl bg-white w-full md:w-auto flex-grow p-3 text-lg"
          />
          <button
            type="submit"
            className="text-bold bg-white text-blue-900 text-lg rounded-lg p-4 inline-flex items-center"
          >
            <FaSearch />
          </button>
        </form>

        {displayData && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-white text-center md:text-left">
                <p className="text-2xl md:text-3xl font-bold mb-2">
                  {displayData.name}, {displayData?.sys?.country}
                </p>
                <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
                  <p className="bg-white text-black text-xl px-4 py-2 rounded font-bold hidden md:block">
                    Today
                  </p>
                  <div className="flex md:flex-col">
                    <p className="text-lg">Time: {time}</p>
                    <p className="text-lg">Date: {date}</p>
                  </div>
                </div>
              </div>
              <div className="text-center space-y-3 mt-4 md:mt-0">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => setActive("f")}
                    className={`p-2 rounded border-2 border-white transition ${
                      active === "f"
                        ? "bg-amber-100 text-blue-700"
                        : "bg-transparent text-white"
                    }`}
                  >
                    &deg;F
                  </button>
                  <button
                    onClick={() => setActive("c")}
                    className={`p-2 rounded border-2 border-white transition ${
                      active === "c"
                        ? "bg-amber-100 text-blue-700"
                        : "bg-transparent text-white"
                    }`}
                  >
                    &deg;C
                  </button>
                </div>
                <p className="text-5xl md:text-7xl font-bold text-white">
                  {active === "c" ? celsius : fahrenheit}
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex flex-col items-center">
                <img
                  src={`https://openweathermap.org/img/wn/${displayData?.weather?.[0]?.icon}@2x.png`}
                  alt="weather icon"
                  className="w-32 md:w-60 h-auto object-cover"
                />
                <p className="text-2xl text-white font-bold text-center">
                  {displayData?.weather?.[0]?.description.toUpperCase()}
                </p>
              </div>
              <div className="flex flex-col md:gap-10">
                <div className="grid grid-cols-2 gap-5 text-white text-lg md:text-2xl font-bold ">
                <WeatherInfoBox
                  label="Pressure"
                  value={displayData.main.pressure}
                  unit="Pa"
                />
                <WeatherInfoBox
                  label="Humidity"
                  value={displayData.main.humidity}
                  unit="%"
                />
                <WeatherInfoBox
                  label="Min Temp"
                  value={(displayData.main.temp_min - 273.15).toFixed(1)}
                  unit="°C"
                />
                <WeatherInfoBox
                  label="Max Temp"
                  value={(displayData.main.temp_max - 273.15).toFixed(1)}
                  unit="°C"
                />
               </div>
               <button className="text-blue-900 bg-white font-bold text-xl p-1 mt-5 md:mt-0 rounded"
               onClick={() => {
                    if (searchCity) {
                      navigate(`/forecast?city=${encodeURIComponent(searchCity)}`);
                    } else if (coord) {
                      navigate(`/forecast?lat=${coord.lat}&lon=${coord.lon}`);
                    } else {
                      navigate("/forecast");
                    }
                  }}
               >
                5 day forecast
               </button>
              </div>
            </div>
          </div>
        )}
      </div>
      )}
    </div>
  );
}

export default Weather;
