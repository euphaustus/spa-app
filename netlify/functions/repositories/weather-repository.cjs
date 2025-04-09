const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

class WeatherRepository {
  constructor(apiKey, baseUrl) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async getWeather(city, units = 'imperial') {
    const url = `${this.baseUrl}?q=${city}&appid=${this.apiKey}&units=${units}`;
    const response = await fetch(url);

    if (!response.ok) {
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

    return response.json();
  }
}

module.exports = WeatherRepository;