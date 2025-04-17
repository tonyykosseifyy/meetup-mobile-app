import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosInstance from './axios.instance';
import Interceptor from '../interceptor/interceptor';

class HttpClient {
  private static instance: HttpClient;
	private axiosInstance: AxiosInstance;
  private interceptor: Interceptor;

  constructor() {
    this.axiosInstance = axiosInstance;
    this.interceptor = Interceptor.getInstance();
  }

  public static getInstance(): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient();
    }
    return HttpClient.instance;
  }

  async executeRequest<T>(request: AxiosRequestConfig, secure?: boolean): Promise<AxiosResponse<T>> {
    try {
      let modifiedRequest = request;
      if (secure) {
        modifiedRequest = await this.interceptor.authenticateRequest(request);
      }
      return await this.axiosInstance(modifiedRequest);
    } catch (error) {
      return await this.interceptor.interceptError(error);
    }
  }

  async get<T>(url: string, config?: AxiosRequestConfig, secure?: boolean): Promise<AxiosResponse<T>> {
    const requestConfig: AxiosRequestConfig = {
      ...config,
      method: 'GET',
      url
    };
    return this.executeRequest<T>(requestConfig, secure);
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig, secure?: boolean): Promise<AxiosResponse<T>> {
    const requestConfig: AxiosRequestConfig = {
      ...config,
      method: 'POST',
      url,
      data
    };
    return this.executeRequest<T>(requestConfig, secure);
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig, secure?: boolean): Promise<AxiosResponse<T>> {
    const requestConfig: AxiosRequestConfig = {
      ...config,
      method: 'PUT',
      url,
      data
    };
    return this.executeRequest<T>(requestConfig, secure);
  }

  async delete<T>(url: string, config?: AxiosRequestConfig, secure?: boolean): Promise<AxiosResponse<T>> {
    const requestConfig: AxiosRequestConfig = {
      ...config,
      method: 'DELETE',
      url
    };
    return this.executeRequest<T>(requestConfig, secure);
  }

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig, secure?: boolean): Promise<AxiosResponse<T>> {
    const requestConfig: AxiosRequestConfig = {
      ...config,
      method: 'PATCH',
      url,
      data
    };
    return this.executeRequest<T>(requestConfig, secure);
  }
}

export default HttpClient;
