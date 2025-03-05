import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const API_KEY = "6cd6a45eade0e6dfa5c8fde5a62dd681"; 
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const response = await axios.get(`${API_URL}`, {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
        },
      });
      setWeather(response.data);
      setError("");
    } catch (err) {
      setError("City not found!");
      setWeather(null);
    }
  };

  return (
    <div className="container">
      <div className="glass-card">
        <h1>Weather App</h1>
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>
        {error && <p className="error">{error}</p>}
        
        {weather && (
          <div className="weather-info">
            <h2>{weather.name}, {weather.sys.country}</h2>
            <h3>🌡️ Temperature: {weather.main.temp}°C</h3>
            <p>🌥️ Condition: {weather.weather[0].description}</p>
            <p>💧 Humidity: {weather.main.humidity}%</p>
            <p>💨 Wind Speed: {weather.wind.speed} m/s</p>
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt="weather icon"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
