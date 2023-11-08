import React, { useState } from 'react';
import searchIcon from '../images/searchIcon.png'

const Search = ({ onSearch }) => {
  const [city, setCity] = useState('');

  function handleSearch () {
    onSearch(city);
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Enter Your City Name"
        spellCheck="false"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>
        <img src= {searchIcon} alt="" />
      </button>
    </div>
  );
};

export default Search;