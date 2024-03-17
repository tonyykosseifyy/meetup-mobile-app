// Assuming '@/api/auth' is correctly pathed relative to this file
import { useMutation, UseMutationResult } from "react-query";
import { login, LoginCredentials, LoginResponse } from "@/api/auth"; // Adjust the import path as necessary
import { useAuth } from "./AuthProvider";

export function useLogin(): UseMutationResult<LoginResponse, unknown, LoginCredentials, unknown> {
  const { updateTokens } = useAuth();

  return useMutation(({ email, password }) => login({ email, password }), {
    onSuccess: (response) => {
      const { accessToken, refreshToken } = response.data; // Adjust according to your API response
      updateTokens({ accessToken, refreshToken });
    },
  });
}
