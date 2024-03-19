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
    full_name: string | null;
    date_of_birth: string | null;
    occupation: string | null;
    biography: string | null;
    interests: number[] | [] | null;
    email: string | null;
    password: string | null;
  };
}

export interface VerifyEmailCredentials {
  email: string;
  password: string;
  code: string;
}

export interface VerifyEmailResponse {
  data: {
    access: string;
    refresh: string;
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
