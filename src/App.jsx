import { useEffect, useState } from 'react'
import './App.css'
import WeatherCard from './components/WeatherCard';
import cityList from './data/cities'
import SearchComponent from './components/SearchComponent';

function App() {

  const apiUrl = import.meta.env.VITE_API_URL
  const apiKey = import.meta.env.VITE_API_KEY

  const [showRequestMessage, setShowRequestMessage] = useState(false)
  const [coords, setCoords] = useState({latitude: null, longitude: null})
  const [inputValue, setInputValue] = useState(null)
  const [weatherData, setWeatherData] = useState({})
  const [filteredCities, setFilteredCities] = useState([])
  const [selectedCity, setSelectedCity] = useState(null)

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
              console.log("User denied the request for geolocation.");
              // You can handle this case, for example, by showing a message to the user
              break;
            case error.POSITION_UNAVAILABLE:
              console.log("Location information is unavailable.");
              // Handle this case as needed
              break;
            case error.TIMEOUT:
              console.log("The request to get user location timed out.");
              // Handle this case as needed
              break;
            case error.UNKNOWN_ERROR:
              console.log("An unknown error occurred.");
              // Handle this case as needed
              break;
            default:
              console.log("An error occurred while getting user location.");
              // Handle other cases as needed
              break;
          }
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    console.log(selectedCity, coords, "API URL")
    const fetchData = async () => {
        let url;
        if (selectedCity) {
          url = `${apiUrl}?q=${selectedCity}&units=metric&APPID=${apiKey}`;
        } else if (coords.latitude !== null && coords.longitude !== null) {
          url = `${apiUrl}?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&APPID=${apiKey}`;
        } else {
            setShowRequestMessage(true);
            return;
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const result = await response.json();
            console.log(result);
            setWeatherData(result);
        } catch (error) {
            console.error('Error fetching data:', error.message);
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

  console.log(filteredCities, "foundCities")
  console.log(apiUrl, "URL")

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
            Object.keys(weatherData).length === 0 ? (
              <div>Please allow location to get current location weather or search for a city.</div>
            ) : (
              <WeatherCard weatherData={weatherData} />
            )
          }
      </div>
    </div>
    </>
  )
}

export default App
