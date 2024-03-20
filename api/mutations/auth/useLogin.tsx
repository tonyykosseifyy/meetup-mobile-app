import { useMutation, UseMutationResult } from "react-query";
import { ILoginRequest, ILoginResponse } from "@/interfaces";
import { AxiosError } from "axios";
import { login } from "../../axios/auth";

export function useLogin(): UseMutationResult<
  ILoginResponse,
  AxiosError,
  ILoginRequest,
  unknown
> {
  return useMutation(({ email, password }) => login({ email, password }));
}
