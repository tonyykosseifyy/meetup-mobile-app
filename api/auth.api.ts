import {
  ILoginRequest,
  ILoginResponse,
  IRegisterRequest,
  IRegisterResponse,
  ISetUserRequest,
  ISetUserResponse,
  IVerifyEmailRequest,
  IVerifyEmailResponse,
} from "@/interfaces";
import AbstractApi from "./utils/abstract-api";

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
    const response = await this.doFetch({
      method: "POST",
      pathExtension: "/login/",
      body: request,
    });
    return response as ILoginResponse;
  }

  async register(request: IRegisterRequest): Promise<IRegisterResponse> {
    const response = await this.doFetch({
      method: "POST",
      pathExtension: "/register/",
      body: request,
    });
    return response as IRegisterResponse;
  }

  async updateUserInfo(request: ISetUserRequest): Promise<ISetUserResponse> {
    const response = await this.doFetch({
      method: "POST",
      pathExtension: "/userinfo/",
      body: request,
    });
    return response as ISetUserResponse;
  }

  async verifyEmail(request: IVerifyEmailRequest): Promise<IVerifyEmailResponse> {
    const response = await this.doFetch({
      method: "POST",
      pathExtension: "/verify-email/",
      body: request,
    });
    return response as IVerifyEmailResponse;
  }
}

export default Auth;
