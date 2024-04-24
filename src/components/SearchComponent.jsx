import React, { useState } from 'react';

function SearchComponent({filterList, filteredCities}) {

    const [inputValue, setInputValue] = useState(null)

    const handleSearchInput = (e) => {
        setInputValue(e.target.value)
      }

    const searchCity = (e) => {
        if(e.keyCode === 13){
            filterList(inputValue)
        }
    }

    console.log(filteredCities, "FITER CITIES")

  return (
    <>
      <input className="mb-10 bg-white text-black p-2" type="search" onChange={handleSearchInput} onKeyDown={searchCity}/>
    </>
  )
}

export default SearchComponent