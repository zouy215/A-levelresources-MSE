import React, { useState, useEffect } from 'react';
import './WeatherDashboard.css';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';
import Forecast from './components/Forecast';
import WeatherAlerts from './components/WeatherAlerts';

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [city, setCity] = useState('London');
  const [isCelsius, setIsCelsius] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [alerts, setAlerts] = useState([]);

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY || 'demo_key';
  const BASE_URL = 'https://api.openweathermap.org/data/2.5';

  // Fetch current weather and forecast data
  useEffect(() => {
    fetchWeatherData(city);
  }, [city, isCelsius]);

  const fetchWeatherData = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      // Fetch current weather
      const weatherResponse = await fetch(
        `${BASE_URL}/weather?q=${cityName}&appid=${API_KEY}&units=${isCelsius ? 'metric' : 'imperial'}`
      );
      
      if (!weatherResponse.ok) {
        throw new Error(`City not found: ${cityName}`);
      }

      const weather = await weatherResponse.json();
      setWeatherData(weather);

      // Fetch 5-day forecast
      const forecastResponse = await fetch(
        `${BASE_URL}/forecast?q=${cityName}&appid=${API_KEY}&units=${isCelsius ? 'metric' : 'imperial'}`
      );

      if (forecastResponse.ok) {
        const forecast = await forecastResponse.json();
        setForecastData(forecast);
      }

      // Check for weather alerts
      checkWeatherAlerts(weather);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  const checkWeatherAlerts = (weather) => {
    const newAlerts = [];
    
    if (weather.main.temp > 35) {
      newAlerts.push({
        id: 1,
        type: 'heat',
        message: '🔥 High Temperature Alert: Extremely hot weather expected'
      });
    }
    
    if (weather.main.temp < -10) {
      newAlerts.push({
        id: 2,
        type: 'cold',
        message: '❄️ Extreme Cold Alert: Dangerously cold conditions'
      });
    }

    if (weather.wind.speed > 20) {
      newAlerts.push({
        id: 3,
        type: 'wind',
        message: '💨 High Wind Alert: Strong winds expected'
      });
    }

    if (weather.main.humidity > 80) {
      newAlerts.push({
        id: 4,
        type: 'humidity',
        message: '💧 High Humidity Alert: Muggy conditions expected'
      });
    }

    setAlerts(newAlerts);
  };

  const handleSearch = (searchCity) => {
    setCity(searchCity);
  };

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  return (
    <div className="weather-dashboard">
      <header className="weather-header">
        <h1>🌤️ Weather Dashboard</h1>
        <p>Real-time weather information and forecasts</p>
      </header>

      <div className="dashboard-controls">
        <SearchBar onSearch={handleSearch} />
        <button 
          className="temp-toggle"
          onClick={toggleTemperatureUnit}
        >
          °{isCelsius ? 'C' : 'F'} | Switch to °{isCelsius ? 'F' : 'C'}
        </button>
      </div>

      {alerts.length > 0 && (
        <WeatherAlerts alerts={alerts} />
      )}

      {loading && <div className="loading">Loading weather data...</div>}
      {error && <div className="error">⚠️ {error}</div>}

      {weatherData && (
        <div className="dashboard-content">
          <WeatherCard 
            data={weatherData} 
            isCelsius={isCelsius}
          />

          {forecastData && (
            <Forecast 
              data={forecastData}
              isCelsius={isCelsius}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;