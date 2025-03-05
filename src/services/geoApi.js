const IP_API_BASE_URL = 'http://ip-api.com/json'; // Free IP geolocation API

export async function fetchLocationByIp() {
  try {
    const response = await fetch(IP_API_BASE_URL);

    if (!response.ok) {
      // Handle HTTP errors for IP API
      const message = `IP Geolocation API error! Status: ${response.status}`;
      throw new Error(message);
    }

    const data = await response.json(); // Parse JSON response from IP API
    return data; // Return geolocation data (including city, country, etc.)

  } catch (error) {
    console.error('Error fetching location by IP:', error);
    throw error; // Re-throw error for component to handle
  }
}