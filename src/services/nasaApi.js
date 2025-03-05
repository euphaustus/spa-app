

const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY;
const NASA_APOD_API_URL = 'https://api.nasa.gov/planetary/apod';

export async function fetchNasaApodData() {
  try {
    const url = `${NASA_APOD_API_URL}?api_key=${NASA_API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      // Handle HTTP errors (e.g., 404, 500)
      const message = `HTTP error! status: ${response.status}`;
      throw new Error(message);
    }
    const data = await response.json(); // Parse JSON response
    return data; // Return the parsed data
  } catch (error) {
    console.error('Error fetching NASA APOD data:', error);
    // Re-throw the error to be handled in the component
    throw error;
  }
}