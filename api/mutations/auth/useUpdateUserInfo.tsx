import { useMutation, UseMutationResult } from "react-query";
import { AxiosError } from "axios";
import { IUpdateUserRequest } from "@/interfaces";
import { updateUser } from "@/api/axios/users";

export function useUpdateUserInfo(): UseMutationResult<any, AxiosError, IUpdateUserRequest, unknown> {
  return useMutation((userInfo) => updateUser(userInfo));
}
