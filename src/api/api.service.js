
let ApiService = class ApiService {
	constructor() {
		this.endPoint = "http://api.openweathermap.org/data/2.5/weather?";
		this.apiKey = "9d7c892d2203cb4385efba288c17580f";
	}

	/*
	* Utility methods/properties
	*/
	getWeatherAddress(lat, lon) {
		return(this.endPoint+"lat="+lat.toString()+"&lon="+lon.toString()+"&appid="+this.apiKey);
	}
};

// Create a Singleton
const apiService = new ApiService();
export default apiService;
