export async function fetchNasaApodData() {
  try {
    const response = await fetch('/.netlify/functions/nasa-apod');

    if (!response.ok) {
      let message = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData && errorData.error) {
          message += ` - ${errorData.error}`;
        }
      } catch (jsonError) {
        console.error("Failed to parse error JSON from Netlify Function", jsonError);
      }
      throw new Error(message);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching NASA APOD data from Netlify Function:', error);
    throw error;
  }
}
