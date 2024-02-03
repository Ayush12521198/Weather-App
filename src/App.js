import React, { useState } from 'react';
import WeatherCard from './components/WeatherCard';
import WeatherInput from './components/WeatherInput';

import './App.css';

const API_KEY = "f56f24967aaf51182d1d4df628297c6d"; // API key for OpenWeatherMap API

const App = () => {
  const [inputCity, setInputCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

 
  const getWeatherDetails = (cityName, latitude, longitude) => {
    const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

    fetch(WEATHER_API_URL)
      .then(response => response.json())
      .then(data => {
        const uniqueForecastDays = [];
        const fiveDaysForecast = data.list.filter(forecast => {
          const forecastDate = new Date(forecast.dt_txt).getDate();
          if (!uniqueForecastDays.includes(forecastDate)) {
            return uniqueForecastDays.push(forecastDate);
           
          }
        });

        setWeatherData({
          cityName: cityName,
          currentWeather: fiveDaysForecast[0],
          fiveDaysForecast: fiveDaysForecast.slice(1, 6),
        });
      })
      .catch(() => {
        alert("An error occurred while fetching the weather forecast!");
      });
  };

  const getCityCoordinates = () => {
    const cityName = inputCity.trim();
    if (cityName === "") return;
    const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;

    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        if (!data.length) return alert(`No coordinates found for ${cityName}`);
        const { lat, lon, name } = data[0];
        getWeatherDetails(name, lat, lon);
      })
      .catch(() => {
        alert("An error occurred while fetching the coordinates!");
      });
  };

  const getUserCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        const API_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
        fetch(API_URL)
          .then(response => response.json())
          .then(data => {
            const { name } = data[0];
            getWeatherDetails(name, latitude, longitude);
          })
          .catch(() => {
            alert("An error occurred while fetching the city name!");
          });
      },
      error => {
        if (error.code === error.PERMISSION_DENIED) {
          alert("Geolocation request denied. Please reset location permission to grant access again.");
        } else {
          alert("Geolocation request error. Please reset location permission.");
        }
      }
    );
  };

  return (
    <div className="container mt-5">
    <WeatherInput
      onSearch={getCityCoordinates}
      onUseCurrentLocation={getUserCoordinates}
      inputCity={inputCity}
      onInputChange={setInputCity}
    />
    <div className="weather-data">
      {weatherData && (
        <>
          <div className="current-weather">
            <WeatherCard cityName={weatherData.cityName} weatherItem={weatherData.currentWeather} index={0} />
          </div>
          <div className="days-forecast">
            <h2>5-Day Forecast</h2>
            <ul className="weather-cards">
              {weatherData.fiveDaysForecast.map((weatherItem, index) =>
                <WeatherCard cityName={weatherData.cityName} weatherItem={weatherItem} index={index + 1} />
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  </div>
);
};

export default App;


