# Weather Dashboard

A modern, responsive weather dashboard built with React that fetches real-time weather data from the OpenWeatherMap API.

## Features

- 🌡️ **Real-time Weather Data**: Current temperature, feels-like temperature, humidity, wind speed, and more
- 📊 **5-Day Forecast**: Extended forecast with daily weather predictions
- 🔍 **City Search**: Search for weather information for any city worldwide
- 🌡️ **Temperature Unit Toggle**: Switch between Celsius and Fahrenheit
- ⚠️ **Weather Alerts**: Automatic alerts for extreme weather conditions (heat, cold, high winds, high humidity)
- 📱 **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- 🎨 **Modern UI**: Beautiful gradient backgrounds and smooth animations

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- An OpenWeatherMap API key (get one at https://openweathermap.org/api)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/zhou12164-jpg/A-levelresources-MSE.git
cd A-levelresources-MSE
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

4. Add your OpenWeatherMap API key to `.env`:
```
REACT_APP_WEATHER_API_KEY=your_actual_api_key_here
```

### Running the Application

```bash
npm start
```

The application will open at `http://localhost:3000`

## API Integration

This dashboard uses the **OpenWeatherMap API** with the following endpoints:

- **Current Weather**: `/data/2.5/weather`
- **5-Day Forecast**: `/data/2.5/forecast`

### Getting an API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Generate an API key
4. Add it to your `.env` file

## Component Structure

```
WeatherDashboard/
├── WeatherDashboard.jsx (Main component)
├── components/
│   ├── WeatherCard.jsx (Current weather display)
│   ├── SearchBar.jsx (City search)
│   ├── Forecast.jsx (5-day forecast)
│   └── WeatherAlerts.jsx (Alert notifications)
├── WeatherDashboard.css (Styles)
└── .env.example (Environment variables template)
```

## Features in Detail

### Real-time Weather Data
Displays comprehensive weather information including:
- Current temperature and weather condition
- Feels-like temperature
- Maximum and minimum temperatures
- Humidity percentage
- Wind speed and direction
- Atmospheric pressure
- Visibility distance
- Cloud coverage

### 5-Day Forecast
Shows daily forecasts with:
- Date and day of week
- Weather icon
- Temperature
- Weather description
- Humidity
- Wind speed
- Precipitation amount (if any)

### Weather Alerts
Automatic alerts trigger for:
- **Heat Alert**: When temperature exceeds 35°C (95°F)
- **Cold Alert**: When temperature drops below -10°C (14°F)
- **Wind Alert**: When wind speed exceeds 20 m/s
- **Humidity Alert**: When humidity exceeds 80%

### City Search
- Search for any city worldwide
- Supports international city names
- Automatic error handling for invalid cities

### Temperature Unit Toggle
- Switch between Celsius and Fahrenheit
- All temperatures update automatically
- Wind speed units also change accordingly

## Usage Examples

### Search for a City
1. Enter a city name in the search bar
2. Click the search button or press Enter
3. Weather data for that city will be displayed

### Toggle Temperature Units
Click the "°C | Switch to °F" button to toggle between Celsius and Fahrenheit

### Interpret Weather Alerts
- Red alerts indicate heat danger
- Blue alerts indicate cold danger
- Yellow alerts indicate strong winds
- Teal alerts indicate high humidity

## Technologies Used

- **React 18+**: UI framework
- **Fetch API**: HTTP requests to OpenWeatherMap API
- **CSS3**: Styling with gradients and animations
- **Environment Variables**: Secure API key management

## Responsive Design

The dashboard is fully responsive with breakpoints for:
- Desktop (1200px and above)
- Tablet (768px to 1199px)
- Mobile (below 768px)

## Error Handling

- Invalid city names show an error message
- Network errors are caught and displayed
- API rate limits are handled gracefully
- Fallback messages for missing data

## Performance Optimization

- Conditional rendering of components
- Efficient state management
- Cached API responses
- Optimized CSS animations

## Future Enhancements

- [ ] Add hourly forecast view
- [ ] Implement weather radar visualization
- [ ] Add favorite cities feature
- [ ] Include air quality index (AQI)
- [ ] Weather history charts
- [ ] UV index information
- [ ] Pollen forecast
- [ ] Dark mode toggle

## Troubleshooting

### "City not found" error
- Check city name spelling
- Use English city names
- Try with country code (e.g., "London, UK")

### API key issues
- Verify API key is correctly added to `.env`
- Check if API key is active on OpenWeatherMap
- Ensure you're not exceeding free tier limits

### No data displaying
- Check browser console for errors
- Verify internet connection
- Restart the development server

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please open an issue on the GitHub repository.

---

**Happy Weather Checking! 🌤️**
