import React, {useState, useEffect} from "react";

const FavoriteCities = () => {
    const [favoriteCities, setFavoriteCities] = useState([]);
    const [newCity, setNewCity] = useState('');
    const [selectedCity, setSelectedCity] = useState(null);

  
    useEffect(() => {
      const storedCities = JSON.parse(localStorage.getItem('favoriteCities'));
      if (storedCities) {
        setFavoriteCities(storedCities);
      }
    }, []);
  
    const addFavoriteCity = () => {
      if (newCity && !favoriteCities.includes(newCity)) {
        const updatedCities = [...favoriteCities, newCity];
        setFavoriteCities(updatedCities);
        localStorage.setItem('favoriteCities', JSON.stringify(updatedCities));
        fetchWeather(newCity);
      }
      setNewCity('');
    };
  
    const removeFavoriteCity = (city) => {
      const updatedCities = favoriteCities.filter((c) => c !== city);
      setFavoriteCities(updatedCities);
      localStorage.setItem('favoriteCities', JSON.stringify(updatedCities));
      setSelectedCity(null);
    };

    const fetchWeather = async (city) => {
        try {
          const apiKey = 'a48cfa75630ececfa09f7d5f9fd5cf6b';
          const apiUrl = `https://api.openweathermap.org/data/2.5/weather?&q=${city}&appid=${apiKey}&units=metric`;
          const response = await fetch(apiUrl);
    
          if (response.ok) {
            const data = await response.json();
            setSelectedCity(data);
          }
        } catch (error) {
          console.error('An error occurred:', error);
        }
      };
    
  
    return (
      <div className="favorite-cities">
        <h2>Favorite Cities</h2>
        <div>
          <input
            type="text"
            placeholder="Add a favorite city"
            value={newCity}
            onChange={(e) => setNewCity(e.target.value)}
          />
          <button onClick={addFavoriteCity}>Add</button>
        </div>
        <ul>
          {favoriteCities.map((city) => (
            <li key={city} >
              {city} 
              <button onClick={() => fetchWeather(city)}>Get Weather</button>
              <button onClick={() => removeFavoriteCity(city)}>Remove</button>
            </li>
          ))}
        </ul>
        {selectedCity && (
        <div>
          <h3>{selectedCity.name}</h3>
          <p>Temperature: {selectedCity.main.temp}°C</p>
          <p>Humidity: {selectedCity.main.humidity}%</p>
          <p>Wind Speed: {selectedCity.wind.speed} km/h</p>
        </div>
      )}
      </div>
    );
  };
  
  export default FavoriteCities;