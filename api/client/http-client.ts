import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosInstance from './axios.instance';

class HttpClient {
  private static instance: HttpClient;
	private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axiosInstance;
  }

  public static getInstance(): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient();
    }
    return HttpClient.instance;
  }

  async executeRequest<T>(request: AxiosRequestConfig, secure: boolean = true): Promise<AxiosResponse<T>> {
    if (secure) {
      // do something
      request.headers = {
        ...request.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }
    return this.axiosInstance(request);
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(url, data, config);
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put<T>(url, data, config);
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T>(url, config);
  }

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.patch<T>(url, data, config);
  }
}

export default HttpClient;
