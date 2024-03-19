import { useMutation, UseMutationResult } from "react-query";
import { verifyEmail, VerifyEmailCredentials, VerifyEmailResponse } from "@/api/auth";
import { useAuth } from "./AuthProvider";

export function useVerifyEmail(): UseMutationResult<
  VerifyEmailResponse,
  unknown,
  VerifyEmailCredentials,
  unknown
> {
  const { updateTokens } = useAuth();
  return useMutation(({ email, password, code }) => verifyEmail({ email, password, code }), {
    onSuccess: (response) => {
      updateTokens({ accessToken: response.data.access, refreshToken: response.data.refresh });
    },
    onError: (e) => {
      console.log(e?.response?.data);
    },
  });
}
