import { useMutation, UseMutationResult } from "react-query";
import { RegisterCredentials, RegisterResponse } from "@/interfaces";
import { AxiosError } from "axios";
import { register } from "@/api/axios/auth";

export function useRegister(): UseMutationResult<
  RegisterResponse,
  AxiosError,
  RegisterCredentials,
  unknown
> {
  return useMutation(({ email, password }) => register({ email, password }), {});
}
