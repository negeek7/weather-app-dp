import { useEffect, useState } from 'react'
import './App.css'
import WeatherCard from './components/WeatherCard';
import cityList from './data/cities'
import SearchComponent from './components/SearchComponent';
import Shimmer from './components/Shimmer';

function App() {

  const apiUrl = import.meta.env.VITE_API_URL
  const apiKey = import.meta.env.VITE_API_KEY

  const [coords, setCoords] = useState({latitude: null, longitude: null})
  const [weatherData, setWeatherData] = useState({})
  const [filteredCities, setFilteredCities] = useState([])
  const [selectedCity, setSelectedCity] = useState(null)
  const [userLocationError, setUserLocationError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setCoords({ latitude, longitude });
        },
        function(error) {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setUserLocationError("User denied the request for geolocation.");
              break;
            case error.POSITION_UNAVAILABLE:
              setUserLocationError("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              setUserLocationError("The request to get user location timed out.");
              break;
            case error.UNKNOWN_ERROR:
              setUserLocationError("An unknown error occurred.");
              break;
            default:
              setUserLocationError("An error occurred while getting user location.");
              break;
          }
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
        let url;
        setIsLoading(true)
        if (selectedCity) {
          url = `${apiUrl}?q=${selectedCity}&units=metric&APPID=${apiKey}`;
        } else if (coords.latitude !== null && coords.longitude !== null) {
          url = `${apiUrl}?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&APPID=${apiKey}`;
        } else {
            return;
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const result = await response.json();
            setWeatherData(result);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        } finally {
          setIsLoading(false)
          setUserLocationError(null)
        }
    };

    fetchData();
}, [coords, selectedCity]);

  const searchForCity = (value) => {
    if(value.trim() == '') return setFilteredCities([]) 
    let val = value.toLowerCase()
    let result = cityList.filter(({city, country}) => city.toLowerCase().includes(val) || country.toLowerCase().includes(val)) 
    setFilteredCities(result)
  }

  const handleSelectCity = (city) => {
    setSelectedCity(city)
  }

  return (
    <>
    <div className="flex h-screen flex-col items-center justify-center h-screen w-screen text-white-700 p-10 bg-gradient-to-r from-slate-900 to-slate-700">

      <div className="flex flex-col justify-center items-center my-auto h-50 w-full">
        <SearchComponent 
          filterList={searchForCity} 
          filteredCities={filteredCities} 
          handleSelectCity={handleSelectCity}
          selectedValue={selectedCity} 
        />
      </div>
    
      <div className="flex justify-center items-center flex-1 mt-6 w-full">
          {
            userLocationError ?
            <p>Please provide access to location by clicking <code className="text-red-500">Allow</code> or search for a city :D</p>
            :
            isLoading || Object.keys(weatherData).length === 0 ? (
              <Shimmer />
            ) : (
              <WeatherCard weatherData={weatherData} isLoading={true}/>
            )
          }
      </div>
    </div>
    </>
  )
}

export default App
