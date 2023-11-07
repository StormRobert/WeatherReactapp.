import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import Weather from './components/Weather';
import FavoriteCities from './components/FavoriteCities';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState('metric'); // Default to Celsius

  const apiKey = 'a48cfa75630ececfa09f7d5f9fd5cf6b';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?&q=`;

  const searchWeather = async (city) => {
    try {
      const response = await fetch(`${apiUrl}${city}&appid=${apiKey}&units=${unit}`);
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
    searchWeather('Kisii'); // Default city
  }, []);

  const toggleUnits = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };
  
  return (
    <div>
      <h1>Weather Today</h1>
      <div className="card">
        <Search />
        
     </div>
    </div>   
  );
}

export default App;
