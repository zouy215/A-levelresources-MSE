import React from 'react';

const WeatherAlerts = ({ alerts }) => {
  return (
    <div className="alerts-section">
      <div className="alerts-container">
        {alerts.map((alert) => (
          <div key={alert.id} className={`alert alert-${alert.type}`}> 
            {alert.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherAlerts;