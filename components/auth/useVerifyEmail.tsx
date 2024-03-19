import { useMutation, UseMutationResult } from "react-query";
import {
  setUserInfo,
  setUserInfoCredentials,
  setUserInfoResponse,
  verifyEmail,
  VerifyEmailCredentials,
} from "@/api/auth";
import { useAuth } from "./AuthProvider";
import { userInfo } from "os";

export function useVerifyEmail(): UseMutationResult<
  unknown,
  unknown,
  VerifyEmailCredentials,
  unknown
> {
  return useMutation(({ email, password, code }) => verifyEmail({ email, password, code }), {
    onError: (e) => {
      console.log(e?.response?.data);
    },
  });
}
