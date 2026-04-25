import React from 'react';

const Forecast = ({ data, isCelsius }) => {
  const tempUnit = isCelsius ? '°C' : '°F';

  // Process forecast data to get one entry per day
  const dailyForecasts = {};
  data.list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    
    if (!dailyForecasts[day]) {
      dailyForecasts[day] = {
        date: day,
        temp: Math.round(item.main.temp),
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        humidity: item.main.humidity,
        windSpeed: item.wind.speed.toFixed(1),
        rain: item.rain ? item.rain['3h'] : 0
      };
    }
  });

  const forecastArray = Object.values(dailyForecasts).slice(0, 5);

  return (
    <div className="forecast-section">
      <h3>5-Day Forecast</h3>
      <div className="forecast-grid">
        {forecastArray.map((forecast, index) => (
          <div key={index} className="forecast-card">
            <div className="forecast-date">{forecast.date}</div>
            <img 
              src={`https://openweathermap.org/img/wn/${forecast.icon}@2x.png`}
              alt={forecast.description}
              className="forecast-icon"
            />
            <div className="forecast-temp">{forecast.temp}{tempUnit}</div>
            <div className="forecast-desc">{forecast.description}</div>
            <div className="forecast-details">
              <span>💧 {forecast.humidity}%</span>
              <span>💨 {forecast.windSpeed}m/s</span>
            </div>
            {forecast.rain > 0 && (
              <div className="forecast-rain">🌧️ {forecast.rain}mm</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;