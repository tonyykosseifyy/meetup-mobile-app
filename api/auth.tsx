import axios from "axios";
import { Ref } from "react";

export interface LoginResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface LoginCredentials {
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

export const login = ({ email, password }: LoginCredentials): Promise<LoginResponse> =>
  axios.post("/auth/login/", { email, password });
export const refreshToken = ({ refreshToken }: RefreshTokenCredentials) =>
  axios.post("/auth/token/refresh", {
    refresh: refreshToken,
  });
