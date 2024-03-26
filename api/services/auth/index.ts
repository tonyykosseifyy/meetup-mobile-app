import axios from "../../axios";
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
} from "./auth.interface";

const authApi = {
  login: async ({ email, password }: ILoginRequest): Promise<ILoginResponse> =>
    await axios.post("/auth/login/", { email: email.toLowerCase(), password }),
  register: async ({ email, password }: IRegisterRequest): Promise<IRegisterResponse> =>
    await axios.post("/auth/register/", { email: email.toLowerCase(), password }),
  generateAccess: async ({ refreshToken }: IRefreshRequest): Promise<IRefreshResponse> =>
    await axios.post("/auth/token/refresh/", { refresh: refreshToken }),
  setUserInfo: async (userInfo: ISetUserRequest): Promise<ISetUserResponse> =>
    await axios.post("/auth/userinfo/", userInfo),
  verifyEmail: async ({
    email,
    password,
    code,
  }: IVerifyEmailRequest): Promise<IVerifyEmailResponse> =>
    await axios.post("/auth/verify-email/", { email: email.toLowerCase(), password, code }),
};

export default authApi;
