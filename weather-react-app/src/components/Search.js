import React, { useState } from 'react';
import searchIcon from '../images/searchIcon.png'
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState('');

  const handleSearch = () => {
    // onSearch(city);
    navigate(`/weather/${city}`);
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