import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import humidity from '../images/humidity.png'
import wind from '../images/wind.png'

const Weather = () => {
  const { city } = useParams();
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const apiKey = 'a48cfa75630ececfa09f7d5f9fd5cf6b';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?&q=${city}&appid=${apiKey}&units=metric`;

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
    
        if (response.ok) {
          const data = await response.json();
          setWeatherData(data);
        } else {
          console.error(`Failed to fetch weather data: ${response.status} - ${response.statusText}`);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchData();
  }, [city]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

    return (
      <div className="current-weather">
        <img
          src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
          alt="Weather Icon"
          className="weather-icon"
        />
        <h2 className="temp">{Math.round(weatherData.main.temp)}°C</h2>
        <h3 className="city">{weatherData.name}</h3>
  
        <div className="details">
          <div className="column">
            <img src={humidity} alt="Humidity" />
            <div>
              <p className="humidity">{weatherData.main.humidity}%</p>
              <p>Humidity</p>
            </div>
          </div>
          <div className="column">
            <img src={wind} alt="Wind Speed" />
            <div>
              <p className="wind">{weatherData.wind.speed} km/h</p>
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
export default Weather;