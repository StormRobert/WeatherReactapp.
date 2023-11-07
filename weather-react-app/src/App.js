import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import Weather from './components/Weather';
import FavoriteCities from './components/FavoriteCities';

function App() {
  return (
    <div>
      <h1>Weather Today</h1>
      <div className="card">
        <Search />
        <Weather />
     </div>
    </div>   
  );
}

export default App;
