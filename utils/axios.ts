import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const API_URL = "https://92aa-212-28-227-50.ngrok-free.app";

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log(`accessToken sent=>>${config.headers.Authorization}`);
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log("response");
    return response;
  },
  async (error) => {
    console.log("eeeeerrr");

    if (error.response.status !== 401) {
      return Promise.reject(error); // Reject usual errors
    }

    const refreshToken = await AsyncStorage.getItem("refreshToken");
    if (!refreshToken) {
      console.error("Refresh token not found. Redirectings tso login...");
      // router.navigate("/login");
      return Promise.reject(error);
    }

    try {
      const url = "/auth/token/refresh/";
      console.log("refreshToken=|||>>", refreshToken);
      const body = {
        refresh: refreshToken,
      };
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await axios.post(`${API_URL}${url}`, body, { headers });

      await AsyncStorage.setItem("accessToken", response.data.access);
      // await AsyncStorage.setItem("refreshToken", response.data.refresh_token);
      console.log(response.data);
      error.response.config.headers["Authorization"] = "Bearer " + response.data.access;
      return axios(error.response.config); // Retry request with new token
    } catch (err: any) {
      console.log("Error refresrhing token:", err);
      router.navigate("/login");
    }
  }
);

export default api;
