const IP_API_BASE_URL = 'http://ip-api.com/json';

export async function fetchLocationByIp() {
  try {
    const response = await fetch(IP_API_BASE_URL);

    if (!response.ok) {

      const message = `IP Geolocation API error! Status: ${response.status}`;
      throw new Error(message);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error fetching location by IP:', error);
    throw error;
  }
}