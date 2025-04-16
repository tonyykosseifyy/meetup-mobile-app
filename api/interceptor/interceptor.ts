import { AxiosRequestConfig, AxiosResponse } from 'axios';
import AuthSession from '../session/auth-session';

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

  public async attachAccessToken(request: AxiosRequestConfig): Promise<void> {
    // get the access token
    // update the request
    const { accessToken } = await this.authSession.getSession();
  }

}

export default Interceptor;
