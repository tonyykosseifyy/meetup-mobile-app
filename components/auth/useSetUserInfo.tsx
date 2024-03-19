import { useMutation, UseMutationResult } from "react-query";
import { setUserInfo, setUserInfoCredentials, setUserInfoResponse } from "@/api/auth";
import { useAuth } from "./AuthProvider";
import { userInfo } from "os";

export function useSetUserInfo(): UseMutationResult<
  setUserInfoResponse,
  unknown,
  setUserInfoCredentials,
  unknown
> {
  const { updateUserInfo } = useAuth();
  return useMutation((userInfo) => setUserInfo(userInfo), {
    onSuccess: (response) => {
      updateUserInfo(response.data);
    },
    onError: (e) => {
      console.log(e?.response?.data);
    },
  });
}
