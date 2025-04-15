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

export default axiosInstance;