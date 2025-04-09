const WeatherRepository = require('./repositories/weather-repository');

exports.handler = async (event, context) => {
  const OPENWEATHERMAP_API_KEY = process.env.VITE_OPENWEATHERMAP_API_KEY;
  const OPENWEATHERMAP_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
  const weatherRepository = new WeatherRepository(OPENWEATHERMAP_API_KEY, OPENWEATHERMAP_BASE_URL);

  const { city } = event.queryStringParameters;

  if (!city) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'A city name is required as a query parameter (e.g., ?city=London).' }),
    };
  }

  try {
    const weatherData = await weatherRepository.getWeather(city);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(weatherData),
    };
  } catch (error) {
    console.error('Error fetching current weather data:', error);
    return {
      statusCode: error.message.includes('Weather API error') ? parseInt(error.message.split('Status: ')[1].split(' ')[0]) : 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: error.message }),
    };
  }
};