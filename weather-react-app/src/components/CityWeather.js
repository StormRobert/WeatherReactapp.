import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


const CityWeatherDetails = () => {
  const { city } = useParams();

  const [weatherData, setWeatherData] = useState(null);

  // Fetch weather data for the specified city using the "city" variable
  useEffect(() => {
    const apiKey = 'a48cfa75630ececfa09f7d5f9fd5cf6b';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=${city}&appid=${apiKey}`;

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
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

    fetchData();
  }, [city]);

  return (
    <div>
    {city && (
      <div>
        <h2>Weather Details for {city}</h2>
        {weatherData && (
          <div>
            <p className="weather-info">Temperature: {Math.round(weatherData.main.temp)}°C</p>
            <p className="weather-info">Humidity: {weatherData.main.humidity}%</p>
            <p className="weather-info">Wind Speed: {weatherData.wind.speed} km/h</p>
          </div>
        )}
      </div>
    )}
  </div>
  );
};

export default CityWeatherDetails;