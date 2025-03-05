import React, { useState, useEffect } from 'react';
import { fetchCurrentWeather } from '../services/weatherApi';
//import { fetchLocationByIp } from '../services/geoApi'; // Import IP geolocation service

function WeatherComponent() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState(null); // State to store city name from IP lookup
  // const city = 'London'; // **No longer hardcoded default city here**

  useEffect(() => {
    const loadWeatherData = async () => {
      setLoading(true);
      setError(null);

      try {
        // 1. Fetch location by IP first

        const locationResponse = await fetch('https://ip-api.com/json'); // Direct fetch to ip-api.com
        if (!locationResponse.ok) {
          setCity("Salt Lake City")
        }

        const locationData = await locationResponse.json();
        const ipCity = locationData.city; // Get city name from IP lookup
        setCity(ipCity); // Set the city state

        // 2. Then, fetch weather data using the IP-based city
        const weatherDataResult = await fetchCurrentWeather(ipCity);
        setWeatherData(weatherDataResult);

      } catch (apiError) {
        setError(apiError.message || 'Failed to load weather data or location');
        console.error('Error in WeatherComponent:', apiError);
      } finally {
        setLoading(false);
      }
    };

    loadWeatherData();
  }, []); // **Dependency array is now empty [] - we only want to run this once on mount**

  if (loading) return <div>Loading weather based on your location...</div>; // Updated loading message
  if (error) return <div className="error">Error loading weather: {error}</div>;
  if (!weatherData || !city) return null; // Check if both weatherData and city are available before rendering

  const temperature = Math.round(weatherData.main.temp);
  const condition = weatherData.weather[0].description;
  const iconCode = weatherData.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <div className="weather-widget">
      <h3>Current Weather in {weatherData.name}, {weatherData.sys.country}</h3> {/* City and Country from Weather API Data! */}
      <p> (Approximate location based on your IP address)</p> {/* Added note about IP-based location */}
      <div className="weather-current-conditions">
        <img src={iconUrl} alt={condition} />
        <p className="temperature">{temperature}°F</p>
        <p className="condition">{condition}</p>
      </div>
    </div>
  );
}

export default WeatherComponent;