import axios from "axios";
import {
  LoginCredentials,
  LoginResponse,
  RegisterCredentials,
  RegisterResponse,
  RefreshTokenCredentials,
  RefreshTokenResponse,
  setUserInfoCredentials,
  setUserInfoResponse,
} from "./interfaces";

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
