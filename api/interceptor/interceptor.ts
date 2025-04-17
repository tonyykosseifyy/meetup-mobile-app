import { AxiosError, AxiosRequestConfig } from 'axios';
import AuthSession from '../session/auth-session';
import ResponseError from '../error/response-error';
import { router } from 'expo-router';



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

	private navigateToLogin = () => {
    router.navigate("/login");
  };

  public async authenticateRequest(config: AxiosRequestConfig): Promise<AxiosRequestConfig> {
    const modifiedConfig = { ...config };
    
    const { accessToken } = await this.authSession.getSession();
      
    if (!accessToken) {
			this.navigateToLogin();
			// do something
			return Promise.reject("No access token found");
    }
    modifiedConfig.headers = modifiedConfig.headers || {};
    modifiedConfig.headers.Authorization = `Bearer ${accessToken}`;
    
		return modifiedConfig;
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
