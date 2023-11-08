import React from 'react';
import humidity from '../images/humidity.png'
import wind from '../images/wind.png'

const Weather = ({ weatherData }) => {
  
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