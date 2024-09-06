import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import { showTokens } from "./tokens";
const API_URL = "https://shiny-phones-occur.loca.lt";
console.log("API_URL: ", API_URL);

const authRoutes = ["/auth/login/", "auth/token/refresh/", "/auth/verify-email/"];

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

type SessionType = {
  accessToken?: string;
  refreshToken?: string;
};

interface RequestParams {
  pathExtension: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  body?: any;
  headers?: Record<string, string>;
  secure?: boolean;
}

abstract class AbstractApi {
  readonly path: string;
  readonly axiosInstance = axiosInstance;
  private session: SessionType = {};
  private sessionDirty: boolean = true;

  constructor(path: string) {
    this.path = path;
  }

  protected getTokens = async (): Promise<SessionType> => {
    console.log("getting the tokens");
    if (this.sessionDirty) {
      const accessToken = (await AsyncStorage.getItem("accessToken")) ?? "";
      const refreshToken = (await AsyncStorage.getItem("refreshToken")) ?? "";
      this.session.accessToken = accessToken;
      this.session.refreshToken = refreshToken;
      console.log("Session: ", this.session);
      this.sessionDirty = false;
    }
    console.log("Session: ", this.session);
    return this.session;
  };

  protected clearTokens = async (): Promise<void> => {
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    this.sessionDirty = true;
  };

  protected setTokens = async (session: SessionType): Promise<void> => {
    this.sessionDirty = true;
    if (session.accessToken) {
      await AsyncStorage.setItem("accessToken", session.accessToken);
    }
    if (session.refreshToken) {
      await AsyncStorage.setItem("refreshToken", session.refreshToken);
    }
  };

  private refreshToken = async (): Promise<void> => {
    const { refreshToken } = await this.getTokens();

    if (!refreshToken) {
      console.log("No refresh token found. Redirecting to login...");
      await this.clearTokens();
      router.navigate("/login");
      return;
    }

    try {
      const response = await axiosInstance.post("/auth/token/refresh/", { refresh: refreshToken });
      console.log("Refreshed the token:", response.data.access);
      await this.setTokens({ accessToken: response.data.access });
      console.log("New access token:", response.data.access);
    } catch (error) {
      console.log("Error refreshing token:", error);
      await this.clearTokens();
      router.navigate("/login");
    }
  };

  protected doFetch = async (request: RequestParams): Promise<any> => {
    const { pathExtension, method, body, headers } = request;
    console.log("Secure:", request.secure);
    const secure = request.secure !== undefined ? request.secure : true;

    try {
      const requestObject: any = {
        url: `${this.path}${pathExtension}`,
        method,
      };

      if (body) {
        requestObject.data = body;
      }

      if (headers) {
        requestObject.headers = headers;
      }

      if (secure) {
        const { accessToken } = await this.getTokens();
        requestObject.headers = {
          ...requestObject.headers,
          Authorization: `Bearer ${accessToken}`,
        };
      }

      console.log("Request Object: ", requestObject);
      const response = await axiosInstance(requestObject);
      return response.data;
    } catch (error: any) {
      console.log("Abstract Error: ", error);

      if (!error.response) {
        console.log("Network Error: ", error.message);
        return Promise.reject(error);
      }

      if (
        error.response &&
        (error.response.status !== 401 || authRoutes.includes(error.response.config.url || ""))
      ) {
        return Promise.reject(error);
      }

      // Refresh the token
      await this.refreshToken();
      const { accessToken: newAccessToken } = await this.getTokens();
      try {
        if (error.response) {
          error.response.config.headers["Authorization"] = "Bearer " + newAccessToken;
          return axios(error.response.config);
        }
      } catch (err: any) {
        console.log("Error refreshing token:", err);
        await this.clearTokens();
        router.navigate("/login");
      }
    }
  };
}

export default AbstractApi;
