import {
  IInterestsRequest,
  ILoginRequest,
  ILoginResponse,
  IRegisterRequest,
  IRegisterResponse,
  ISetUserRequest,
  ISetUserResponse,
  IUser,
  IUserInfo,
  IVerifyEmailRequest,
  IVerifyEmailResponse,
} from "@/interfaces";
import AbstractApi from "./utils/abstract-api";

type ILookupResponse = IUser[];
type IUserResponse = IUserInfo;

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

  async login(request: ILoginRequest): Promise<ILoginResponse> {
    const response = await super.doFetch({
      method: "POST",
      pathExtension: "/login/",
      body: request,
      secure: false,
    });
    return response as ILoginResponse;
  }

  async logout(): Promise<void> {
    await super.clearTokens();
  }

  async register(request: IRegisterRequest): Promise<IRegisterResponse> {
    const response = await super.doFetch({
      method: "POST",
      pathExtension: "/register/",
      body: request,
      secure: false,
    });
    return response as IRegisterResponse;
  }

  async setUserInfo(request: ISetUserRequest): Promise<ISetUserResponse> {
    const response = await super.doFetch({
      method: "POST",
      pathExtension: "/userinfo/",
      body: request,
    });
    return response as ISetUserResponse;
  }

  async verifyEmail(request: IVerifyEmailRequest): Promise<IVerifyEmailResponse> {
    const response = await super.doFetch({
      method: "POST",
      pathExtension: "/verify-email/",
      body: request,
      secure: false,
    });
    return response as IVerifyEmailResponse;
  }

  async lookup(): Promise<ILookupResponse> {
    console.log("lookup");
    const response = await super.doFetch({
      method: "GET",
      pathExtension: "/lookup/",
    });
    return response as ILookupResponse;
  }

  async getMe(): Promise<IUserResponse> {
    console.log("getMe");
    const response = await super.doFetch({
      method: "GET",
      pathExtension: "/userinfo/",
    });
    return response as IUserResponse;
  }

  async updateUserInfo(request: ISetUserRequest): Promise<IUserResponse> {
    const response = await super.doFetch({
      method: "PATCH",
      pathExtension: "/userinfo/",
      body: request,
    });
    return response as IUserResponse;
  }

  async changePassword(request: ISetUserRequest): Promise<void> {
    return await super.doFetch({
      method: "POST",
      pathExtension: "/change-password/",
      body: request,
    });
  }

  async resetPassword(request: ISetUserRequest): Promise<void> {
    return await super.doFetch({
      method: "POST",
      pathExtension: "/reset-password/",
      body: request,
    });
  }

  async setInterests(interests: IInterestsRequest): Promise<ISetUserResponse> {
    return await super.doFetch({
      method: "PATCH",
      pathExtension: "/userinfo/",
      body: {
        interests_data: interests,
      },
    });
  }
}
export default Auth;
