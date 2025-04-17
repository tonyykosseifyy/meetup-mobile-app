import { router } from "expo-router";
import AppConfig from "@/config/env-config";
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import HttpClient from "@/api/client/http-client";
import AuthSession from "@/api/session/auth-session";
import ResponseError from "@/api/error/response-error";
import { SessionType, RequestParams } from "./types";

const config = AppConfig.getInstance();

export const API_URL = config.getConfig().API_URL;

console.log("API_URL: ", API_URL);
// auth/userinfo


abstract class AbstractApi {
  readonly path: string;
  private httpClient: HttpClient;
  protected authSession: AuthSession;

  constructor(path: string) {
    this.path = path;
    this.httpClient = HttpClient.getInstance();
    this.authSession = AuthSession.getInstance();
  }


  private navigateToLogin = () => {
    router.navigate("/login");
  };

  private refreshToken = async (): Promise<boolean> => {
    const { refreshToken } = await this.authSession.getSession();

    if (!refreshToken) {
      console.log("No refresh token found. Redirecting to login...");
      this.navigateToLogin();
      return false;
    }

    try {
      const response = await this.httpClient.post<{ access: string }>("/auth/token/refresh/", { refresh: refreshToken });
      console.log("--------Refreshed the token----------:", response, ' access token: ', response.data.access);
      const access = response.data.access;
      this.authSession.updateAccessToken(access);
      return true; 
    } catch (error) {
      console.log("Error refreshing token:", error);
      await this.authSession.clearSession();
      this.navigateToLogin();
      return false;
    }
  };

  protected doFetch = async (request: RequestParams): Promise<any> => {
    const { pathExtension, method, body, headers } = request;
    const secure = request.secure !== undefined ? request.secure : true;

    let session = await this.authSession.getSession();
    console.log("session: ", session);

    const requestObject: AxiosRequestConfig = {
      url: `${this.path}${pathExtension}`,
      method, 
    };

    if (body) {
      requestObject.data = body;
    }

    if (headers) {
      requestObject.headers = headers;
    }

    try {
      const response = await this.httpClient.executeRequest(requestObject, secure);
      return response.data;
    } catch (error: any) {
      if (error instanceof ResponseError && error.status === 401) {
        const refreshTokenResult: boolean = await this.refreshToken();
        if (!refreshTokenResult) {
          return Promise.reject(error);
        }
        console.log("Retrying request with new access token...");
        try {
          return await this.httpClient.executeRequest(requestObject, secure);
        } catch (err: any) {
          console.log("Error with the retried response:", err);
          Promise.reject(err);
      }
      } else {
        return Promise.reject(error);
      }
    }
  };
}

export default AbstractApi;
