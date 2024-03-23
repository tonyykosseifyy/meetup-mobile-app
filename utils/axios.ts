import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const API_URL = "https://selimellieh.pythonanywhere.com";
const authRoutes = ["/auth/login/", "auth/token/refresh/", "/auth/verify-email/"];

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response.data,
  async (error: AxiosError) => {
    console.log("eeeeerrr");

    if (
      error &&
      error.response &&
      (error.response.status !== 401 || authRoutes.includes(error.response.config.url || ""))
    ) {
      return Promise.reject(error);
    }
    console.log("error.response=>", error);

    const refreshToken = await AsyncStorage.getItem("refreshToken");
    if (!refreshToken) {
      console.error("Refresh token not found. Redirectings tso login...");
      router.navigate("/login");
      return Promise.reject(error);
    }

    try {
      const url = "/auth/token/refresh/";
      console.log("refreshToken=|||>>", refreshToken);
      const body = {
        refresh: refreshToken,
      };
      const response = await axios.post(`${API_URL}${url}`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      await AsyncStorage.setItem("accessToken", response.data.access);
      // await AsyncStorage.setItem("refreshToken", response.data.refresh_token);
      console.log(response.data);
      if (error.response) {
        error.response.config.headers["Authorization"] = "Bearer " + response.data.access;
        return axios(error.response.config);
      }
    } catch (err: any) {
      console.log("Error refresrhing token:", err);
      router.navigate("/login");
    }
  }
);

export default api;
