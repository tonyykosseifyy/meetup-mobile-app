import axios from "axios";
import AppConfig from "@/config/env-config";

const config = AppConfig.getInstance();

const axiosInstance = axios.create({
	baseURL: config.getConfig().API_URL,
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

axiosInstance.interceptors.request.use(async (config) => {
	console.log('→ Request');
    console.log('   URL:   ', config.url);
    console.log('   Method:', config.method?.toUpperCase());
    console.log('   Headers:', config.headers);
    return config;

});

axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
	  console.log('← Response Error');
	  if (error.response) {
		// The request was made and server responded
		console.log('   Status: ', error.response.status);
		console.log('   Message:', error.message);
	  } else {
		// No response (e.g. network error, timeout)
		console.log('   Error Message:', error.message);
	  }
	  return Promise.reject(error);
	}
  );

  
export default axiosInstance;