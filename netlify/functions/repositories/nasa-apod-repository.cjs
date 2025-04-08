// netlify/functions/repositories/nasa-apod-repository.js
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

class NasaApodRepository {
  constructor(apiKey, baseUrl) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async getApodData() {
    const url = `${this.baseUrl}?api_key=${this.apiKey}`;
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.msg || `NASA APOD API error! Status: ${response.status}`);
    }
    return response.json();
  }
}

module.exports = NasaApodRepository;