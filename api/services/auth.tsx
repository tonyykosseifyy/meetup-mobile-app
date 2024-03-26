import axios from "../axios/axios";
import {
  IRegisterRequest,
  ILoginRequest,
  ILoginResponse,
  IRegisterResponse,
  IRefreshRequest,
  IRefreshResponse,
  ISetUserResponse,
  IVerifyEmailRequest,
  IVerifyEmailResponse,
  ISetUserRequest,
} from "../../interfaces";

const login = async ({ email, password }: ILoginRequest): Promise<ILoginResponse> => {
  return await axios.post("/auth/login/", { email: email.toLowerCase(), password });
};

const register = async ({ email, password }: IRegisterRequest): Promise<IRegisterResponse> => {
  return await axios.post("/auth/register/", { email, password });
};

const generateAccess = async ({ refreshToken }: IRefreshRequest): Promise<IRefreshResponse> =>
  await axios.post("/auth/token/refresh/", { refresh: refreshToken });

const setUserInfo = async (userInfo: ISetUserRequest): Promise<ISetUserResponse> => {
  return await axios.post("/auth/userinfo/", userInfo);
};

const verifyEmail = async ({
  email,
  password,
  code,
}: IVerifyEmailRequest): Promise<IVerifyEmailResponse> => {
  return await axios.post("/auth/verify-email/", { email, password, code });
};

export { login, register, generateAccess, setUserInfo, verifyEmail };
