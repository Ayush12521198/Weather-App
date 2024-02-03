// WeatherCard.js
import React from 'react';
import '../App.css'
const WeatherCard = ({ cityName, weatherItem, index }) => {
  if (index === 0) {
    return (
      <div className="details" key={index}>
        <h2>{cityName} ({weatherItem.dt_txt.split(" ")[0]})</h2>
        <h6>Temperature: {(weatherItem.main.temp - 273.15).toFixed(2)}°C</h6>
        <h6>Wind: {weatherItem.wind.speed} M/S</h6>
        <h6>Humidity: {weatherItem.main.humidity}%</h6>
      </div>
    );
  } else {
    return (
      <li className="card" key={index}>
        <h3>({weatherItem.dt_txt.split(" ")[0]})</h3>
        <img src={`https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png`} alt="weather-icon" />
        <h6>Temp: {(weatherItem.main.temp - 273.15).toFixed(2)}°C</h6>
        <h6>Wind: {weatherItem.wind.speed} M/S</h6>
        <h6>Humidity: {weatherItem.main.humidity}%</h6>
      </li>
    );
  }
};

export default WeatherCard;
