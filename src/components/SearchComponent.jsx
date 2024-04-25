import React, { useEffect, useRef, useState } from 'react';

function SearchComponent({ filterList, filteredCities, handleSelectCity, selectedValue}) {

    const [inputValue, setInputValue] = useState(null)
    const [showSuggestionBox, setShowSuggestionBox] = useState(false)
    const suggestionRef = useRef(null)

    const handleSearchInput = (e) => {
        setInputValue(e.target.value)
    }

    const searchCity = (e) => {
        if (e.keyCode === 13) {
            filterList(inputValue)
        }
    }

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
                setShowSuggestionBox(false);
            }
        };

        if(!filteredCities.length){
            setShowSuggestionBox(false)
        } else {
            setShowSuggestionBox(true)
        }

        if (showSuggestionBox) {
            console.log("asdasdsad ASDASDASd")
            document.addEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [filteredCities, suggestionRef])

    const handleCityClick = (city, country) => {
        setInputValue(`${city}, ${country}`)
        setShowSuggestionBox(false)
        handleSelectCity(city)
    }


    return (
        <>
            <div class="relative w-80">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input
                    type="search"
                    id="default-search"
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-yellow-50 outline-none"
                    placeholder='Enter City or Country...'
                    autoComplete='off'
                    onChange={handleSearchInput}
                    onKeyDown={searchCity}
                    value={inputValue}
                />
                <code class=" absolute end-2.5 bottom-3.5 rounded text-xs text-red-700 bg-black p-1">press enter</code>
            </div>

            <div 
                id="dropdown" 
                className={`z-10 bg-white ${!showSuggestionBox && 'hidden'} divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 absolute top-28 w-80 max-h-80 overflow-hidden overflow-y-auto scroll-smooth`}
                ref={suggestionRef}
            >
                <ul className="text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                    {
                        filteredCities.map(item => (
                            <li>
                                <button
                                    type="button"
                                    className="inline-flex w-full px-4 py-2 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white  !outline-none"
                                    onClick={() => handleCityClick(item.city, item.country)}
                                >
                                    <span>{item.city}, {item.country}</span>
                                </button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}

export default SearchComponent