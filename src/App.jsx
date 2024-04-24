import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [coords, setCoords] = useState({latitude: null, longitude: null})



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
      <p className="text-3xl font-bold underline bg-red-900" >Hello</p> 
    </>
  )
}

export default App
