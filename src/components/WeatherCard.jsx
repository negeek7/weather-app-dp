import React from 'react';
import sunIcon from '../assets/sun.svg'
import moonIcon from '../assets/moon.svg'
import rainIcon from '../assets/rain.svg'
import snowIcon from '../assets/snow.svg'
import thunderIcon from '../assets/thunder.svg'

function WeatherCard({ weatherData }) {

    function formatDate(dateString) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    }
    const formattedDate = formatDate(new Date());

    const getTemperatureIcon = (value = '') => {
        let weather = value
        let condition = weather.weather[0].main.toLowerCase()
        const isDay = new Date().valueOf() / 1000 < weather.sys.sunset;
        if (condition === "clouds") {
            if (isDay) {
                return sunIcon;
            } else {
                return moonIcon;
            }
        } else if (condition === "rain") {
            return rainIcon
        } else if (condition === "snow") {
            return snowIcon
        } else if (condition === "drizzle") {
            return rainIcon
        } else {
            return sunIcon;
        }
    }


    return (
        <div className="flex flex-col gap-4 w-full items-center">
            <div className="flex flex-col bg-slate-900 text-sky-400 rounded p-4 w-full max-w-xs">
                <div className="flex justify-between items-center" >
                    <div>
                        <div className="font-bold text-text-sky-400 xl">{weatherData.name}</div>
                        <div className="text-sm">{formattedDate}</div>
                    </div>
                </div>

                <div className="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
                    <img src={getTemperatureIcon(weatherData)} alt="temperature icon" />
                </div>

                <div className="font-bold xl text-center mt-4">{weatherData.weather[0].main}</div>
                <div className="text-sm font-light text-gray-500 text-center">({weatherData.weather[0].description})</div>
                <div className="flex flex-row items-center justify-center mt-4">

                    <div className="font-medium text-6xl">{Math.floor(weatherData.main.temp)}&deg;C</div>
                    <div className="flex flex-col items-center ml-6">
                        <div className="mt-1">
                            <span className="text-sm"><i className="far fa-long-arrow-up"></i></span>
                            <span className="text-sm font-light text-gray-500">Min {Math.floor(weatherData.main.temp_min)}&deg;C</span>
                        </div>
                        <div>
                            <span className="text-sm"><i className="far fa-long-arrow-down"></i></span>
                            <span className="text-sm font-light text-gray-500">Max {Math.floor(weatherData.main.temp_max)}&deg;C</span>
                        </div>
                    </div>
                </div>


                <div className="flex flex-row justify-between mt-6">
                    <div className="flex flex-col items-center">
                        <div className="font-medium text-sm">Wind</div>
                        <div className="text-sm text-gray-500">{weatherData.wind.speed}km/h</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="font-medium text-sm">Humidity</div>
                        <div className="text-sm text-gray-500">{weatherData.main.humidity}%</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="font-medium text-sm">Visibility</div>
                        <div className="text-sm text-gray-500">{weatherData.visibility / 1000}km</div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default WeatherCard