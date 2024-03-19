import { useMutation, UseMutationResult } from "react-query";
import { register, RegisterCredentials, RegisterResponse } from "@/api/auth";

export function useRegister(): UseMutationResult<
  RegisterResponse,
  unknown,
  RegisterCredentials,
  unknown
> {
  return useMutation(({ email, password }) => register({ email, password }), {});
}
