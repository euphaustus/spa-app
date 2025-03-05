// src/services/weatherApi.js

const OPENWEATHERMAP_API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY; // **Replace with your actual API key!**
const OPENWEATHERMAP_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'; // Current weather API endpoint

export async function fetchCurrentWeather(city) {
  try {
    const url = `${OPENWEATHERMAP_BASE_URL}?q=${city}&appid=${OPENWEATHERMAP_API_KEY}&units=imperial`; // Construct API URL
    const response = await fetch(url);

    if (!response.ok) {
      // Handle HTTP errors
      let message = `Weather API error! Status: ${response.status}`;
      try {
        const errorData = await response.json(); // Try to parse error JSON (if API provides it)
        if (errorData && errorData.message) {
          message += ` - ${errorData.message}`; // Append API error message if available
        }
      } catch (jsonError) {
        // If JSON parsing fails, just use the basic status message
        console.error("Failed to parse error JSON from Weather API", jsonError);
      }
      throw new Error(message); // Throw error to be caught by component
    }

    const data = await response.json(); // Parse JSON data on success
    return data; // Return weather data
  } catch (error) {
    console.error('Error fetching current weather data:', error);
    throw error; // Re-throw error for component to handle
  }
}