import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import AuthSession from '../session/auth-session';
import { Alert } from 'react-native';
import { router } from "expo-router";
import { ResponseError } from '../error/response-error';

interface TokenResponse {
  accessToken?: string;
  refreshToken?: string;
}
const authRoutes = ["auth/login/", "auth/token/refresh/", "auth/verify-email/"];

class Interceptor {
  private static instance: Interceptor;
  private authSession: AuthSession = AuthSession.getInstance();

  private constructor() {}

  public static getInstance(): Interceptor {
    if (!Interceptor.instance) {
      Interceptor.instance = new Interceptor();
    }
    return Interceptor.instance;
  }

  public async authenticateRequest(config: AxiosRequestConfig): Promise<void> {
    const modifiedConfig = { ...config };
    
    const { accessToken } = await this.authSession.getSession();
      
    if (!accessToken) {
        // do something 
    }
    modifiedConfig.headers = modifiedConfig.headers || {};
    modifiedConfig.headers.Authorization = `Bearer ${accessToken}`;
  }

  public async interceptError(error: any): Promise<never> {
    if (error instanceof AxiosError) {
      console.log("Axios Error: ", error);

      if (!error.response) {
        // Network Error 
        return Promise.reject(ResponseError.networkError());
      }

      if (error.response && (error.response.status !== 401)) {
        return Promise.reject(ResponseError.fromAxiosError(error));
      }

			return Promise.reject(ResponseError.fromAxiosError(error));
		} else {
			return Promise.reject(ResponseError.unexpectedError());
		}
	 }

}

export default Interceptor;
