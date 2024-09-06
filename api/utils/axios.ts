// import axios, { AxiosError } from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { router } from "expo-router";
// import { clearTokens } from "@/api/utils/tokens";

// const API_URL = process.env.EXPO_PUBLIC_API_URL;

// const authRoutes = ["/auth/login/", "auth/token/refresh/", "/auth/verify-email/"];

// const api = axios.create({
//   baseURL: API_URL,
//   timeout: 10000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// api.interceptors.request.use(
//   async (config) => {
//     const accessToken = await AsyncStorage.getItem("accessToken");
//     if (accessToken) {
//       config.headers["Authorization"] = "Bearer " + accessToken;
//     }
//     const method = config.method && config.method.toUpperCase(); // Ensure method is in uppercase
//     const relativeUrl = config.url;

//     // Log the request details in the format "METHOD /path"
//     console.log(`${method} ${relativeUrl}`);

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// api.interceptors.response.use(
//   (response) => response.data,
//   async (error: AxiosError) => {
//     console.log("eeeeerrr", error);

//     if (
//       error &&
//       error.response &&
//       (error.response.status !== 401 || authRoutes.includes(error.response.config.url as string))
//     ) {
//       return Promise.reject(error);
//     }
//     console.log("error.response=>", error);

//     const refreshToken = await AsyncStorage.getItem("refreshToken");
//     if (!refreshToken) {
//       console.error("Refresh token not found. Redirectings tso login...");
//       router.navigate("/login");
//       return Promise.reject(error);
//     }

//     try {
//       const url = "/auth/token/refresh/";
//       console.log("refreshToken=|||>>", refreshToken);
//       const body = {
//         refresh: refreshToken,
//       };
//       const response = await axios.post(`${API_URL}${url}`, body, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       console.log("got from backend after refresh token", response.data);
//       await AsyncStorage.setItem("accessToken", response.data.access);

//       console.log(response.data);
//       if (error.response) {
//         error.response.config.headers["Authorization"] = "Bearer " + response.data.access;
//         return axios(error.response.config);
//       }
//     } catch (err: any) {
//       console.log("Error refresrhing token:", err);
//       clearTokens();
//       router.navigate("/login");
//     }
//   }
// );

// export default api;
