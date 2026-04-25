import React from 'react';

const WeatherCard = ({ data, isCelsius }) => {
  const tempUnit = isCelsius ? '°C' : '°F';
  const speedUnit = isCelsius ? 'm/s' : 'mph';

  return (
    <div className="weather-card">
      <div className="current-weather">
        <div className="location">
          <h2>{data.name}, {data.sys.country}</h2>
          <p>{data.weather[0].description}</p>
        </div>

        <div className="temperature-section">
          <div className="main-temp">
            <span className="temperature">{Math.round(data.main.temp)}{tempUnit}</span>
            <img 
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
              alt={data.weather[0].description}
              className="weather-icon"
            />
          </div>

          <div className="temp-details">
            <div className="detail-item">
              <span className="label">Feels Like</span>
              <span className="value">{Math.round(data.main.feels_like)}{tempUnit}</span>
            </div>
            <div className="detail-item">
              <span className="label">Max / Min</span>
              <span className="value">
                {Math.round(data.main.temp_max)}{tempUnit} / {Math.round(data.main.temp_min)}{tempUnit}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="weather-details-grid">
        <div className="detail-box">
          <span className="detail-icon">💧</span>
          <span className="detail-label">Humidity</span>
          <span className="detail-value">{data.main.humidity}%</span>
        </div>

        <div className="detail-box">
          <span className="detail-icon">🌪️</span>
          <span className="detail-label">Wind Speed</span>
          <span className="detail-value">{data.wind.speed.toFixed(1)} {speedUnit}</span>
        </div>

        <div className="detail-box">
          <span className="detail-icon">🧭</span>
          <span className="detail-label">Wind Direction</span>
          <span className="detail-value">{data.wind.deg}°</span>
        </div>

        <div className="detail-box">
          <span className="detail-icon">🔽</span>
          <span className="detail-label">Pressure</span>
          <span className="detail-value">{data.main.pressure} hPa</span>
        </div>

        <div className="detail-box">
          <span className="detail-icon">👁️</span>
          <span className="detail-label">Visibility</span>
          <span className="detail-value">{(data.visibility / 1000).toFixed(1)} km</span>
        </div>

        <div className="detail-box">
          <span className="detail-icon">☁️</span>
          <span className="detail-label">Cloudiness</span>
          <span className="detail-value">{data.clouds.all}%</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;