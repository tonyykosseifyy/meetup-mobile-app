import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { Axios, AxiosError } from "axios";
import { router } from "expo-router";
import { Alert } from "react-native";

export const API_URL = "https://fruity-regions-kiss.loca.lt";

console.log("API_URL: ", API_URL);
// auth/userinfo
const authRoutes = ["auth/login/", "auth/token/refresh/", "auth/verify-email/"];

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
    if (this.sessionDirty) {
      const accessToken = (await AsyncStorage.getItem("accessToken")) ?? "";
      const refreshToken = (await AsyncStorage.getItem("refreshToken")) ?? "";
      this.session.accessToken = accessToken;
      this.session.refreshToken = refreshToken;
      this.sessionDirty = false;
    }
    console.log("Session: ", this.session);
    return this.session;
  };

  protected clearTokens = async (): Promise<void> => {
    this.sessionDirty = true;
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
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

  private navigateToLogin = async (url: string): Promise<void> => {
    console.log("url", url);
    if (url !== "auth/userinfo/") router.navigate("/login");
  };

  private refreshToken = async (url: string): Promise<void> => {
    const { refreshToken } = await this.getTokens();

    if (!refreshToken) {
      console.log("No refresh token found. Redirecting to login...");
      await this.clearTokens();
      this.navigateToLogin(url);
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
      this.navigateToLogin(url);
    }
  };

  protected doFetch = async (request: RequestParams): Promise<any> => {
    const { pathExtension, method, body, headers } = request;
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

      // console.log("Request Object: ", requestObject);
      const response = await axiosInstance(requestObject);
      // console.log("Response: ", response.data);
      return response.data;
    } catch (error: any) {
      if (error instanceof AxiosError) {
        console.log("Abstract Error: ", error);

        if (!error.response) {
          console.log("Network Error: ", error.message);
          Alert.alert("Network Error", "Please check your internet connection and try again.", [
            {
              text: "OK",
            },
          ]);
          return Promise.reject(error);
        }

        if (
          error.response &&
          (error.response.status !== 401 || authRoutes.includes(error.response.config.url || ""))
        ) {
          return Promise.reject(error);
        }

        // Refresh the token
        await this.refreshToken(error.response.config.url ?? "");
        const { accessToken: newAccessToken } = await this.getTokens();
        if (!newAccessToken) {
          return;
        }
        try {
          error.response.config.headers["Authorization"] = "Bearer " + newAccessToken;
          console.log("Retrying request with new access token...", error.response.config);
          // console.log('error.response.config', error.response.config)
          const retriedResponse = await this.axiosInstance(error.response.config);
          console.log("Retried Response: ", retriedResponse.data);
          return retriedResponse.data;
        } catch (err: any) {
          console.log("Error with the retried response:", err);
          await this.clearTokens();
          this.navigateToLogin(error.response.config.url ?? "");
        }
      } else {
        return Promise.reject(error);
      }
    }
  };
}

export default AbstractApi;
