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
  email: string;
  password: string;
  full_name?: string;
  date_of_birth?: string;
  occupation?: string;
  biography?: string;
  interests?: number[];
  city_id: string
}

interface ISetUserResponse {
  full_name: string;
  date_of_birth: string;
  occupation: string;
  biography: string;
  interests: number[];
  email: string;
  password: string;
  id: number;
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
