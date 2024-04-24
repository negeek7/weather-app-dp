import { useEffect, useState } from 'react'
import './App.css'
import WeatherCard from './components/WeatherCard'

function App() {
  const [coords, setCoords] = useState({latitude: null, longitude: null})



  // https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

  useEffect(() => {
    const fetchData = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setCoords({latitude, longitude})
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }


    }
    fetchData()
  }, [])

  console.log(coords.latitude, coords.longitude, "LAT AND LONG VALUE")

  return (
    <>
    <div className="flex flex-col items-center justify-center h-screen w-screen text-white-700 p-10 bg-gradient-to-r from-slate-900 to-slate-700">
      <WeatherCard />
    </div>
    </>
  )
}

export default App
