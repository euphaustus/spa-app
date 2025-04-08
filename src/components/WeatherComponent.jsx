import React, { useState, useEffect } from 'react';

function WeatherComponent() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const city = "Salt Lake City"; // change when going back to ip-based

  useEffect(() => {
    const loadWeatherData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/weather?city=${city}`);
        if (!response.ok) {
          let message = `Weather API error! Status: ${response.status}`;
          try {
            const errorData = await response.json();
            if (errorData && errorData.error) {
              message += ` - ${errorData.error}`;
            }
          } catch (jsonError) {
            console.error("Failed to parse error JSON from Weather API", jsonError);
          }
          throw new Error(message);
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (apiError) {
        setError(apiError.message || 'Failed to load weather data');
        console.error('Error in WeatherComponent:', apiError);
      } finally {
        setLoading(false);
      }
    };

    loadWeatherData();
  }, [city]);

  if (loading) return <div>Loading weather...</div>;
  if (error) return <div className="error">Error loading weather: {error}</div>;
  if (!weatherData) return null;

  const temperature = Math.round(weatherData.main.temp);
  const condition = weatherData.weather[0].description;
  const iconCode = weatherData.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <div className="weather-widget">
      <h3>Current Weather in {weatherData.name}, {weatherData.sys.country}</h3>
      <p> (Approximate location (if IP-based location is working- SLC if not))</p>
      <div className="weather-current-conditions">
        <img src={iconUrl} alt={condition} />
        <p className="temperature">{temperature}°F</p>
        <p className="condition">{condition}</p>
      </div>
    </div>
  );
}

export default WeatherComponent;