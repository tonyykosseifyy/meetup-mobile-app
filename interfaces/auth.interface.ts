interface LoginResponse {
  data: {
    access: string;
    refresh: string;
  };
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface IRegisterResponse {
  data: {
    access: string;
    refresh: string;
  };
}

interface IRegisterRequest {
  email: string;
  password: string;
}

interface RefreshTokenCredentials {
  refreshToken: string;
}

interface RefreshTokenResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

interface setUserInfoCredentials {
  full_name?: string;
  date_of_birth?: string;
  occupation?: string;
  biography?: string;
  interests?: number[];
  email?: string;
  password?: string;
}
interface setUserInfoResponse {
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

interface VerifyEmailCredentials {
  email: string;
  password: string;
  code: string;
}

interface VerifyEmailResponse {
  data: {
    access: string;
    refresh: string;
  };
}

export {
  LoginResponse,
  LoginCredentials,
  IRegisterResponse,
  IRegisterRequest,
  RefreshTokenCredentials,
  RefreshTokenResponse,
  setUserInfoCredentials,
  setUserInfoResponse,
  VerifyEmailResponse,
  VerifyEmailCredentials,
};
