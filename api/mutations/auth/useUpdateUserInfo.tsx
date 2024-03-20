import { useMutation, UseMutationResult } from "react-query";
import { AxiosError } from "axios";
import { UpdateUserInfo } from "@/interfaces";
import { updateUser } from "@/api/axios/users";

export function useUpdateUserInfo(): UseMutationResult<any, AxiosError, UpdateUserInfo, unknown> {
  return useMutation((userInfo) => updateUser(userInfo));
}
