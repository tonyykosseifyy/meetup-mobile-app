// Assuming '@/api/auth' is correctly pathed relative to this file
import { UseMutationResult, useMutation } from "react-query";
import {
  RefreshTokenCredentials,
  RefreshTokenResponse,
  refreshToken as refreshApiToken,
} from "@/api/axios/auth"; // Adjust the import path as necessary
import { useAuth } from "./AuthProvider";

export function useRefreshToken(): UseMutationResult<
  RefreshTokenResponse,
  unknown,
  RefreshTokenCredentials,
  unknown
> {
  const { refreshToken, updateTokens } = useAuth();

  return useMutation(
    refreshToken
      ? () => refreshApiToken({ refreshToken })
      : async () => {
          throw new Error("No refresh token available");
        },
    {
      onSuccess: (response) => {
        const { accessToken, refreshToken: newRefreshToken } = response.data; // Adjust according to your API response structure
        updateTokens({ accessToken, refreshToken: newRefreshToken });
      },
    }
  );
}
