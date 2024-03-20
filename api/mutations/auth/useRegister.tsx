import { useMutation, UseMutationResult } from "react-query";
import { IRegisterRequest, IRegisterResponse } from "@/interfaces";
import { AxiosError } from "axios";
import { register } from "@/api/axios/auth";

export function useRegister(): UseMutationResult<
  IRegisterResponse,
  AxiosError,
  IRegisterRequest,
  unknown
> {
  return useMutation(({ email, password }) => register({ email, password }));
}
