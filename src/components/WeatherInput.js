// WeatherInput.js
import React from 'react';
import '../App.css';

const WeatherInput = ({ onSearch, onUseCurrentLocation, inputCity, onInputChange }) => {
  return (
    <div className="weather-input">
      <h1>Weather Dashboard</h1>
      <h3>Enter a City Name</h3>
      <input
        className="city-input"
        type="text"
        placeholder="E.g., New York, London, Tokyo"
        value={inputCity}
        onChange={(e) => onInputChange(e.target.value)}
      />
      <button className="search-btn" onClick={onSearch}>
        Search
      </button>
      <div className="separator"></div>
      <button className="location-btn" onClick={onUseCurrentLocation}>
        Use Current Location
      </button>
    </div>
  );
};

export default WeatherInput;
