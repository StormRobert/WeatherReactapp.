import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import Weather from './components/Weather';
import './App.css'
import FavoriteCities from './components/FavoriteCities';
import { Route, Routes } from 'react-router-dom';
import CityWeatherDetails from './components/CityWeather';
function App() {
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = 'a48cfa75630ececfa09f7d5f9fd5cf6b';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=`;

  const searchWeather = async (city) => {
    try {
      if (!city) {
        // Handle empty city name 
        console.error('City name is empty');
        return;
      }

      const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  useEffect(() => {
    searchWeather(''); //Default seting no city displayed
  }, [searchWeather]);
  
  return (
    <div>
      <h1>Weather Today</h1>
      <div className="card">
        <Search onSearch={searchWeather} />
        {weatherData && <Weather weatherData={weatherData}  />}
     </div>
     <FavoriteCities/>
     <Routes>
        <Route path="/weather/:city" element={<CityWeatherDetails />} />
      </Routes>
    </div>
  );
}
 
  

export default App;
