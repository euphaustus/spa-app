const OPENWEATHERMAP_API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
const OPENWEATHERMAP_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export async function fetchCurrentWeather(city) {
  try {
    const url = `${OPENWEATHERMAP_BASE_URL}?q=${city}&appid=${OPENWEATHERMAP_API_KEY}&units=imperial`;
    const response = await fetch(url);

    if (!response.ok) {
      // Handle HTTP errors
      let message = `Weather API error! Status: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData && errorData.message) {
          message += ` - ${errorData.message}`;
        }
      } catch (jsonError) {

        console.error("Failed to parse error JSON from Weather API", jsonError);
      }
      throw new Error(message);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching current weather data:', error);
    throw error;
  }
}