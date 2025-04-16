import { AxiosError } from 'axios';
import { ErrorData, IResponseError } from './types';


class ResponseError extends Error implements IResponseError {
  public name: string;
  public message: string;
  public status?: number;
  public isAxiosError: boolean;

  constructor({
    name = 'ResponseError',
    message = 'An error occurred',
    status,
    isAxiosError = false
  }: Partial<IResponseError> = {}) {
    super(message);
    this.name = name;
    this.message = message;
    this.status = status;
    this.isAxiosError = isAxiosError;
  }

  static fromAxiosError(error: AxiosError): ResponseError {
    if (!error.response) {
      return ResponseError.networkError();
    }

    const data = error.response.data as ErrorData;
    
    return new ResponseError({
      name: data?.name || error.name,
      message: data?.message || error.message,
      status: error.response.status,
      isAxiosError: true
    });
  }

  static unexpectedError(): ResponseError {
    return new ResponseError({
      name: 'Unexpected Error',
      message: 'An unexpected error occurred',
      isAxiosError: false
    });
  }

  static networkError(): ResponseError {
    return new ResponseError({
      name: 'Network Error',
      message: 'Please check your internet connection and try again.',
      isAxiosError: false
    });
  }

  static authenticationError(): ResponseError {
    return new ResponseError({
      name: 'Authentication Error',
      message: 'Your session has expired. Please login again.',
      status: 401,
      isAxiosError: true
    });
  }

  toJSON(): IResponseError {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      isAxiosError: this.isAxiosError
    };
  }
}

export default ResponseError;