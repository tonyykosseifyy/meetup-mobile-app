import {
  IInterestsRequest,
  ILoginRequest,
  ILoginResponse,
  IRegisterRequest,
  IRegisterResponse,
  ISetUserRequest,
  ISetUserResponse,
  IUpdateUserRequest,
  IUser,
  IUserInfo,
  IVerifyEmailRequest,
  IVerifyEmailResponse,
  AvatarsReponse,
  IInterest,
} from "@/interfaces";
import AbstractApi from "./utils/abstract-api";

type ILookupResponse = IUser[];
type IUserResponse = IUserInfo;

type GetMeResponse = {
  id?: number;
  full_name: string;
  date_of_birth: string;
  occupation: string;
  biography: string;
  interests: IInterest[];
  email: string;
  password: string;
  loc_lat: number | null;
  loc_lon: number | null;
  city: {
    id: string;
    name: string;
  };
  avatar: {
    id: number;
    image_url: string;
  } | null;
};
class Auth extends AbstractApi {
  private static instance: Auth | null = null;
  readonly path = "auth";

  constructor() {
    super("auth");
  }

  public static getInstance(): Auth {
    if (Auth.instance === null) {
      Auth.instance = new Auth();
    }
    return Auth.instance;
  }

  public login = async (request: ILoginRequest): Promise<ILoginResponse> => {
    const response = await this.doFetch({
      method: "POST",
      pathExtension: "/login/",
      body: request,
      secure: false,
    });
    const { access, refresh } = response;
    await this.setTokens({ accessToken: access, refreshToken: refresh });

    return response as ILoginResponse;
  };

  public logout = async (): Promise<void> => {
    await this.clearTokens();
  };

  public register = async (request: IRegisterRequest): Promise<IRegisterResponse> => {
    const response = await this.doFetch({
      method: "POST",
      pathExtension: "/register/",
      body: request,
      secure: false,
    });
    return response as IRegisterResponse;
  };

  public setUserInfo = async (request: ISetUserRequest): Promise<ISetUserResponse> => {
    console.log(request);
    const response = await this.doFetch({
      method: "POST",
      pathExtension: "/userinfo/",
      body: request,
      secure: false,
    });
    return response as ISetUserResponse;
  };

  public verifyEmail = async (request: IVerifyEmailRequest): Promise<IVerifyEmailResponse> => {
    const response = await this.doFetch({
      method: "POST",
      pathExtension: "/verify-email/",
      body: request,
      secure: false,
    });
    await this.setTokens({ accessToken: response.access, refreshToken: response.refresh });
    return response as IVerifyEmailResponse;
  };

  public lookup = async (): Promise<ILookupResponse> => {
    console.log("lookup");
    const response = await this.doFetch({
      method: "GET",
      pathExtension: "/lookup/",
    });
    return response as ILookupResponse;
  };

  public getMe = async (): Promise<GetMeResponse> => {
    console.log("getMe");

    const response = await this.doFetch({
      method: "GET",
      pathExtension: "/userinfo/",
    });
    return response as GetMeResponse;
  };

  public updateUserInfo = async (request: IUpdateUserRequest): Promise<IUserResponse> => {
    const response = await this.doFetch({
      method: "PATCH",
      pathExtension: "/userinfo/",
      body: request,
    });
    return response as IUserResponse;
  };

  public changePassword = async (request: {
    current_password: string;
    new_password: string;
  }): Promise<void> => {
    return await this.doFetch({
      method: "PATCH",
      pathExtension: "/password-reset/",
      body: request,
      secure: true,
    });
  };

  public requestResetPassword = async (request: { email: string }): Promise<void> => {
    return await this.doFetch({
      method: "POST",
      pathExtension: "/forgot-password/",
      body: request,
      secure: false,
    });
  };

  public checkResetOtpCode = async (request: { email: string; code: string }): Promise<void> => {
    return await this.doFetch({
      method: "POST",
      pathExtension: "/check-otp-validity/",
      body: request,
      secure: false,
    });
  };

  public resetPassword = async (request: {
    email: string;
    code: string;
    password: string;
  }): Promise<void> => {
    return await this.doFetch({
      method: "PATCH",
      pathExtension: "/forgot-password/",
      body: request,
      secure: false,
    });
  };

  public setInterests = async (interests: IInterestsRequest): Promise<ISetUserResponse> => {
    return await this.doFetch({
      method: "PATCH",
      pathExtension: "/userinfo/",
      body: {
        interests_data: interests,
      },
    });
  };
  public getAllAvatars = async (): Promise<AvatarsReponse[]> => {
    const response = await this.doFetch({
      method: "GET",
      pathExtension: "/avatars/",
    });
    return response as AvatarsReponse[];
  };
}

export default Auth;
