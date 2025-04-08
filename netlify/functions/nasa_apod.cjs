// netlify/functions/nasa_apod.js

exports.handler = async (event, context) => {
  const nasaApiKey = process.env.VITE_NASA_API_KEY;
  const nasaApodApiUrl = 'https://api.nasa.gov/planetary/apod';

  if (!nasaApiKey) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'NASA API key not configured in environment variables.' }),
    };
  }

  try {
    const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
    const url = `${nasaApodApiUrl}?api_key=${nasaApiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      const message = `HTTP error! status: ${response.status}`;
      return { statusCode: response.status, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: message }) };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Error fetching NASA APOD data:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: error.message }),
    };
  }
};