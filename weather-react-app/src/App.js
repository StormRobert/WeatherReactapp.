import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Outlet } from 'react-router-dom';
import Search from './components/Search';
import Weather from './components/Weather';
import './App.css'
import FavoriteCities from './components/FavoriteCities';


function App() {
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = 'a48cfa75630ececfa09f7d5f9fd5cf6b';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=`;

  const searchWeather = async (city) => {
    try {
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
  }, []);
  
  return (
    <Router>
      <div>
        <h1>Weather Today</h1>
        <Route path="/" element={<div className="card">
          <Search onSearch={searchWeather} />
          {weatherData && <Weather weatherData={weatherData} />}
          <Outlet />
        </div>} />
        <Route path="/favorite-cities" element={<FavoriteCities />} />
      </div>
    </Router>
  );
}
 
  

export default App;
