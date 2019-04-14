import apiService from './api.service';

let WeatherService = class WeatherService {
  constructor() {

  }
  getWeather(lat, lon) {
    return new Promise((resolve, reject) => {
      fetch(apiService.getWeatherAddress(lat, lon))
        .then((response) => response.json())
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  }
};

// Create a Singleton
const weatherService = new WeatherService();
export default weatherService;