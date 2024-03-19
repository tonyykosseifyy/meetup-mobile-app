import axios from "axios";
import { Ref } from "react";

export interface LoginResponse {
  data: {
    access: string;
    refresh: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}
export interface RegisterResponse {
  data: {
    access: string;
    refresh: string;
  };
}

export interface RegisterCredentials {
  email: string;
  password: string;
}

export interface RefreshTokenCredentials {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface setUserInfoCredentials {
  full_name?: string;
  date_of_birth?: string;
  occupation?: string;
  biography?: string;
  interests?: number[];
  email?: string;
  password?: string;
}
export interface setUserInfoResponse {
  data: {
    full_name: string;
    date_of_birth: string;
    occupation: string;
    biography: string;
    interests: number[];
  };
}

export const login = ({ email, password }: LoginCredentials): Promise<LoginResponse> =>
  axios.post("/auth/login/", { email, password });

export const register = ({ email, password }: RegisterCredentials): Promise<RegisterResponse> =>
  axios.post("/auth/register/", { email, password });
export const refreshToken = ({
  refreshToken,
}: RefreshTokenCredentials): Promise<RefreshTokenResponse> =>
  axios.post("/auth/token/refresh", {
    refresh: refreshToken,
  });

export const setUserInfo = (userInfo: setUserInfoCredentials): Promise<setUserInfoResponse> =>
  axios.post("/auth/userinfo/", userInfo);
