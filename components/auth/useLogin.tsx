// Assuming '@/api/auth' is correctly pathed relative to this file
import { useMutation, UseMutationResult } from "react-query";
import { LoginCredentials, LoginResponse } from "@/interfaces";
import { login } from "@/api/axios/auth";
import { AxiosError } from "axios";

export function useLogin(): UseMutationResult<
  LoginResponse,
  AxiosError,
  LoginCredentials,
  unknown
> {
  return useMutation(({ email, password }) => login({ email, password }));
}
