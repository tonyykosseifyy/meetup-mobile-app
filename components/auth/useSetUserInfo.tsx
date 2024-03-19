import { useMutation, UseMutationResult } from "react-query";
import { setUserInfo, setUserInfoCredentials, setUserInfoResponse } from "@/api/auth";

export function useSetUserInfo(): UseMutationResult<
  setUserInfoResponse,
  unknown,
  setUserInfoCredentials,
  unknown
> {
  return useMutation((userInfo) => setUserInfo(userInfo), {});
}
