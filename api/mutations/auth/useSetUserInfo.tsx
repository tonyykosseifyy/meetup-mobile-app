import { useMutation, UseMutationResult } from "react-query";
import { setUserInfo } from "@/api/axios/auth";
import { ISetUserRequest, ISetUserResponse } from "@/interfaces";
import { AxiosError } from "axios";

export function useSetUserInfo(): UseMutationResult<
  ISetUserResponse,
  AxiosError,
  ISetUserRequest,
  unknown
> {
  return useMutation((userInfo) => setUserInfo(userInfo));
}
