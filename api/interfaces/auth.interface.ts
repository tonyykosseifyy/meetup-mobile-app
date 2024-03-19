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
