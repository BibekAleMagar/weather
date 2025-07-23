import { QueryClient } from "@tanstack/react-query"
import { QueryClientProvider } from "@tanstack/react-query"
import Weather from "./components/weather";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Forecast from "./components/fiveDayWeather";



const queryClient = new QueryClient()

function App () {

  return(
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter >
        <Routes>
          <Route path="/" element={<Weather />} />
          <Route path="/forecast" element={<Forecast />} />
          
        </Routes></BrowserRouter>
        
      </QueryClientProvider>
    </>
  )
}

export default App;