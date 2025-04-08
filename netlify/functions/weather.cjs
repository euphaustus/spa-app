const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

exports.handler = async (event, context) => {
  const OPENWEATHERMAP_API_KEY = process.env.VITE_OPENWEATHERMAP_API_KEY;
  const OPENWEATHERMAP_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

  const { city } = "Salt Lake City";

  if (!city) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'A city name is required as a query parameter (e.g., ?city=London).' }),
    };
  }

  const url = `${OPENWEATHERMAP_BASE_URL}?q=${city}&appid=${OPENWEATHERMAP_API_KEY}&units=imperial`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      let message = `Weather API error! Status: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData && errorData.message) {
          message += ` - ${errorData.message}`;
        }
      } catch (jsonError) {
        console.error("Failed to parse error JSON from Weather API", jsonError);
      }
      return {
        statusCode: response.status,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: message }),
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Error fetching current weather data:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: error.message }),
    };
  }
};