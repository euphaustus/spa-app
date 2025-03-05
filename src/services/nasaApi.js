const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY;
const NASA_APOD_API_URL = 'https://api.nasa.gov/planetary/apod';

export async function fetchNasaApodData() {
  try {
    const url = `${NASA_APOD_API_URL}?api_key=${NASA_API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {

      const message = `HTTP error! status: ${response.status}`;
      throw new Error(message);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching NASA APOD data:', error);

    throw error;
  }
}