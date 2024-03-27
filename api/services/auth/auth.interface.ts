import { IInterest } from "../interface";

interface ILoginResponse {
  access: string;
  refresh: string;
}

interface ILoginRequest {
  email: string;
  password: string;
}

interface IRegisterResponse {
  access: string;
  refresh: string;
}

interface IRegisterRequest {
  email: string;
  password: string;
}

interface IRefreshRequest {
  refreshToken: string;
}

interface IRefreshResponse {
  accessToken: string;
  refreshToken: string;
}

interface ISetUserRequest {
  full_name: string;
  date_of_birth: string;
  occupation: string;
  biography: string;
  email: string;
  password: string;
}

interface ISetUserResponse {
  id: number;
  email: string;
  full_name: string;
  date_of_birth: string;
  occupation: string;
  biography: string;
  interests: IInterest[];
}

interface IVerifyEmailRequest {
  email: string;
  password: string;
  code: string;
}

interface IVerifyEmailResponse {
  access: string;
  refresh: string;
}

export {
  ILoginResponse,
  ILoginRequest,
  IRegisterResponse,
  IRegisterRequest,
  IRefreshRequest,
  IRefreshResponse,
  ISetUserResponse,
  IVerifyEmailRequest,
  IVerifyEmailResponse,
  ISetUserRequest,
};
