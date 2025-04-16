import { AxiosError } from "axios";
import { Alert } from "react-native";
import AuthService from "./auth-service";
import AbstractApi from "./abstract/abstract-api";

class InterceptorService {
  private static instance: InterceptorService;
  private authService: AuthService;

  private constructor() {
    this.authService = AuthService.getInstance();
  }

  public static getInstance(): InterceptorService {
    if (!InterceptorService.instance) {
      InterceptorService.instance = new InterceptorService();
    }
    return InterceptorService.instance;
  }

  public async handleError(error: AxiosError, api: AbstractApi): Promise<any> {
    if (!error.response) {
      this.handleNetworkError(error);
      return Promise.reject(error);
    }

    if (this.isAuthError(error)) {
      return this.handleAuthError(error, api);
    }

    return Promise.reject(error);
  }

  private handleNetworkError(error: AxiosError): void {
    console.log("Network Error: ", error.message);
    Alert.alert("Network Error", "Please check your internet connection and try again.", [
      { text: "OK" },
    ]);
  }

  private isAuthError(error: AxiosError): boolean {
    return error.response?.status === 401 && 
           !this.isAuthRoute(error.response.config.url || "");
  }

  private isAuthRoute(url: string): boolean {
    const authRoutes = ["auth/login/", "auth/token/refresh/", "auth/verify-email/"];
    return authRoutes.some(route => url.includes(route));
  }

  private async handleAuthError(error: AxiosError, api: AbstractApi): Promise<any> {
    const tokenRefreshed = await this.authService.refreshToken(api);
    if (!tokenRefreshed) {
      return Promise.reject(error);
    }

    try {
      const { accessToken } = await this.authService.getTokens();
      if (!accessToken) {
        return Promise.reject(error);
      }

      error.response!.config.headers["Authorization"] = `Bearer ${accessToken}`;
      return api.doFetch({
        method: error.response!.config.method as any,
        pathExtension: error.response!.config.url || "",
        body: error.response!.config.data,
        headers: error.response!.config.headers,
      });
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export default InterceptorService; 