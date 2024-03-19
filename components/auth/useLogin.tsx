// Assuming '@/api/auth' is correctly pathed relative to this file
import { useMutation, UseMutationResult } from "react-query";
import { LoginCredentials, LoginResponse } from "@/api/interfaces";
import { useAuth } from "./AuthProvider";
import { login } from "@/api/auth";

export function useLogin(): UseMutationResult<LoginResponse, unknown, LoginCredentials, unknown> {
  return useMutation(({ email, password }) => login({ email, password }), {
    onSuccess: (response) => {
      const { access, refresh } = response.data;
      console.log("SUCCESSSS"); // Adjust according to your API response
    },
  });
}
