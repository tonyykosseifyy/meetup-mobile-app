import { useMutation, UseMutationResult } from "react-query";
import { setUserInfo } from "@/api/axios/auth";
import { setUserInfoCredentials, setUserInfoResponse } from "@/interfaces";

export function useSetUserInfo(): UseMutationResult<
  setUserInfoResponse,
  unknown,
  setUserInfoCredentials,
  unknown
> {
  return useMutation((userInfo) => setUserInfo(userInfo));
}
