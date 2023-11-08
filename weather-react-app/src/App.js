import React, { useState, useEffect } from 'react';
import { useRoutes, Outlet } from 'react-router-dom';
import Search from './components/Search';
import Weather from './components/Weather';
import './App.css'
import FavoriteCities from './components/FavoriteCities';


function App() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    searchWeather(''); // Default setting, no city displayed
  }, []);

  
  const searchWeather = async (city) => {
    try {
      const apiKey = 'a48cfa75630ececfa09f7d5f9fd5cf6b';
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      const response = await fetch(apiUrl);

      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
      } else {
        console.error(`Failed to fetch data: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const routes = useRoutes([
    { path: '/', element: <Search onSearch={searchWeather} /> },
    {
      path: '/',
      element: (
        <>
          <FavoriteCities />
          <Outlet /> {/* This will render the child route */}
        </>
      ),
      children: [{ path: 'weather/:city', element: <Weather /> }],
    },
  ]);

  return (
    <div>
      <h1>Weather Today</h1>
      {routes}
    </div>
  );
}

export default App;
