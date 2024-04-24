import { useEffect, useState } from 'react'
import './App.css'
import WeatherCard from './components/WeatherCard';
import cityList from './data/cities'
import SearchComponent from './components/SearchComponent';

function App() {

  const [coords, setCoords] = useState({latitude: null, longitude: null})
  const [inputValue, setInputValue] = useState(null)
  const [filteredCities, setFilteredCities] = useState([])

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

  const searchForCity = (value) => {
    let val = value.toLowerCase()
    let result = cityList.filter(({city, country}) => city.toLowerCase().includes(val) || country.toLowerCase().includes(val)) 
    setFilteredCities(result)
  }

  console.log(filteredCities, "foundCities")

  return (
    <>
    <div className="flex flex-col border-2 border-red items-center justify-center h-screen w-screen text-white-700 p-10 bg-gradient-to-r from-slate-900 to-slate-700">

      <div>
        <SearchComponent filterList={searchForCity} filteredCities={filteredCities} />
      </div>
    
      <div>
        <WeatherCard />
      </div>

    </div>
    </>
  )
}

export default App
