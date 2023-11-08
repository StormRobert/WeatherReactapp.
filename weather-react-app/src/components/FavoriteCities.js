import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

const FavoriteCities = () => {
  const [favoriteCities, setFavoriteCities] = useState([]);
  const [newCity, setNewCity] = useState('');
  const [selectedCities, setSelectedCities] = useState({});

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
      toggleWeather(newCity);
    }
    setNewCity('');
  };

  const removeFavoriteCity = (city) => {
    const updatedCities = favoriteCities.filter((c) => c !== city);
    setFavoriteCities(updatedCities);
    localStorage.setItem('favoriteCities', JSON.stringify(updatedCities));
    const updatedSelectedCities = { ...selectedCities };
    delete updatedSelectedCities[city];
    setSelectedCities(updatedSelectedCities);
  };

  const toggleWeather = async (city) => {
  if (selectedCities[city]) {
    const updatedSelectedCities = { ...selectedCities };
    delete updatedSelectedCities[city];
    setSelectedCities(updatedSelectedCities);
  } else {
    try {
      const apiKey = 'a48cfa75630ececfa09f7d5f9fd5cf6b';
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=${city}&appid=${apiKey}`;
      const response = await fetch(apiUrl);

      if (response.ok) {
        const data = await response.json();
        setSelectedCities({ ...selectedCities, [city]: data });
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
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
      <div className="city-cards">
        {favoriteCities.map((city) => (
          <div key={city} className="city-card">
            <h3>{city}</h3>
            {selectedCities[city] && (
              <div>
                <p>Temperature: {selectedCities[city].main.temp}°C</p>
                <p>Humidity: {selectedCities[city].main.humidity}%</p>
                <p>Wind Speed: {selectedCities[city].wind.speed} km/h</p>
              </div>
            )}
            <button onClick={() => toggleWeather(city)}>
              {selectedCities[city] ? 'Hide' : ' Details'}
            </button>
            <button onClick={() => removeFavoriteCity(city)}>Remove</button>
            <Link to={`/weather/${city}`}>View Weather</Link>
          </div>
        ))}
      </div>
    </div>
  );
};
  
  export default FavoriteCities;