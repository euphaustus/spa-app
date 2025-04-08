// nasa_apod.cjs
const NasaApodRepository = require('./repositories/nasa-apod-repository');

exports.handler = async (event, context) => {
  const nasaApiKey = process.env.VITE_NASA_API_KEY;
  const nasaApodBaseUrl = 'https://api.nasa.gov/planetary/apod';
  const nasaApodRepository = new NasaApodRepository(nasaApiKey, nasaApodBaseUrl);

  try {
    const apodData = await nasaApodRepository.getApodData();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(apodData),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: error.message }),
    };
  }
};