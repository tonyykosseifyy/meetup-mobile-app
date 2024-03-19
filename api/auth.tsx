import axios from "../utils/axios";
import { Ref } from "react";
import {
  RegisterCredentials,
  RegisterResponse,
  setUserInfoCredentials,
  setUserInfoResponse,
  LoginCredentials,
  LoginResponse,
  RefreshTokenCredentials,
  RefreshTokenResponse,
  VerifyEmailCredentials,
  VerifyEmailResponse,
} from "./interfaces";

export const login = ({ email, password }: LoginCredentials): Promise<LoginResponse> =>
  axios.post("/auth/login/", { email: email.toLowerCase(), password });

export const register = ({ email, password }: RegisterCredentials): Promise<RegisterResponse> =>
  axios.post("/auth/register/", { email, password });

export const refreshToken = ({
  refreshToken,
}: RefreshTokenCredentials): Promise<RefreshTokenResponse> =>
  axios.post("/auth/token/refresh", {
    refresh: refreshToken,
  });

export const setUserInfo = async (
  userInfo: setUserInfoCredentials
): Promise<setUserInfoResponse> => {
  try {
    const resp = await axios.post("/auth/userinfo/", userInfo);
    return resp;
  } catch (e) {
    throw e;
  }
};

export const verifyEmail = async ({
  email,
  password,
  code,
}: VerifyEmailCredentials): Promise<VerifyEmailResponse> => {
  try {
    return await axios.post("/auth/verify-email/", { email, password, code });
  } catch (e) {
    throw e;
  }
};
